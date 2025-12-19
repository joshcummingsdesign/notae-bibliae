"use client";
import * as d3 from "d3";
import { FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { renderToStaticMarkup } from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import { FamilyNodeContent } from "./FamilyNodeContent";
import { SearchInput as SearchInputBase } from "./SearchInput";
import {
  Button,
  ButtonGroup as ButtonGroupBase,
  Popover,
  styled,
} from "@mui/material";
import {
  UnfoldLess,
  UnfoldMore,
  ZoomOutMap,
  HighlightOff,
  FilterAlt,
} from "@mui/icons-material";
import {
  FilterToggles,
  FilterTogglesRef,
  FilterTogglesState,
} from "./FilterToggles";
import { NotesDrawer } from "./NotesDrawer";
import {
  FamilyNode,
  nodeCategory,
  nodeGender,
  nodeType,
} from "@/types/FamilyTree";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_LG } from "@/components/Navigation";
import { colors } from "@/assets/styles";
import { Loader } from "@/components/Loader";

interface Props {
  data?: FamilyNode[];
  isLoading?: boolean;
}

export const FamilyTree: FC<Props> = ({ data, isLoading }) => {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");
  const drawerTimeout = useRef<NodeJS.Timeout | null>(null);
  const linksTimeout = useRef<NodeJS.Timeout | null>(null);
  const d3Container = useRef<HTMLDivElement>(null);
  const chart = useRef<OrgChart<FamilyNode> | null>(null);
  const genderToggleRef = useRef<FilterTogglesRef>(null);
  const categoryToggleRef = useRef<FilterTogglesRef>(null);
  const typeToggleRef = useRef<FilterTogglesRef>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchSelectedNode, setSearchSelectedNode] =
    useState<FamilyNode | null>(null);
  const [highlightedNode, setHighlightedNode] = useState<FamilyNode | null>(
    null
  );
  const [filtersAnchorEl, setFiltersAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [filters, setFilters] = useState<string[]>([
    ...nodeGender,
    ...nodeCategory,
    ...nodeType,
  ]);
  const [selectedNode, setSelectedNode] = useState<FamilyNode | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleExpandAll = () => {
    if (!chart.current) return;

    setSearchValue("");
    setSearchSelectedNode(null);
    chart.current.expandAll().clearHighlighting();

    if (highlightedNode) {
      chart.current.setCentered(highlightedNode.id).render();
    }

    setHighlightedNode(null);
  };

  const resetFilters = () => {
    if (
      !chart.current ||
      !genderToggleRef.current ||
      !categoryToggleRef.current ||
      !typeToggleRef.current
    )
      return;

    const chartData = chart.current.data() || [];

    // Mark all previously expanded nodes for collapse
    chartData.forEach((d) => (d._dimmed = false));

    // Reset the toggles
    genderToggleRef.current.reset();
    categoryToggleRef.current.reset();
    typeToggleRef.current.reset();

    // Update data and rerender graph
    chart.current.data(chartData).render();
  };

  const handleCollapseAll = () => {
    if (!chart.current) return;

    setSearchValue("");
    setSearchSelectedNode(null);
    setHighlightedNode(null);
    chart.current
      .collapseAll()
      .clearHighlighting()
      .initialZoom(1)
      .setCentered(1)
      .render();
  };

  const handleSearchChange = async (node?: FamilyNode) => {
    if (!chart.current || !node) return;

    setSearchSelectedNode(node);

    chart.current
      .clearHighlighting()
      .setHighlighted(node.id)
      .expandAll()
      .setCentered(node.id)
      .initialZoom(0.75)
      .render();
  };

  const handleSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  const handleClearSearchInput = () => {
    if (!chart.current) return;

    setSearchValue("");
    setSearchSelectedNode(null);
    setHighlightedNode(null);
    chart.current.clearHighlighting();
  };

  const handleFit = () => {
    if (!chart.current) return;

    chart.current.fit();
  };

  const handleReset = () => {
    if (!chart.current) return;

    resetFilters();
    handleClearSearchInput();
  };

  const handleNodeClick = useCallback(
    (e: MouseEvent) => {
      if (!chart.current) return;

      const target = e.target as HTMLElement;

      // Handle click away
      if (target.classList.contains("svg-chart-container")) {
        setHighlightedNode(null);
        chart.current.clearHighlighting();

        return;
      }

      // Handle heading click (open drawer)
      if (target.classList.contains("btr-node-heading")) {
        const chartData = chart.current.data() || [];
        const id = Number(target.getAttribute("data-node-id"));
        setSelectedNode(chartData.find((d) => d.id === id) || null);
        setIsDrawerOpen(true);

        // Re-render biblegateway links after content has loaded
        linksTimeout.current && clearTimeout(linksTimeout.current);
        linksTimeout.current = setTimeout(() => {
          if (window.BGLinks) {
            window.BGLinks.version = "ESV";
            window.BGLinks.linkVerses();
          }
        }, 300);

        return;
      }

      // Handle node icon click (highlight up)
      if (target.classList.contains("btr-node-container")) {
        const chartData = chart.current.data() || [];
        const id = Number(target.getAttribute("data-node-id"));
        const descendants = getDescendants(chartData, id);

        chart.current.clearHighlighting();

        // Mark all previously expanded nodes for collapse
        chartData.forEach((d) => (d._expanded = false));

        // Find the nodes and toggle the highlighting
        descendants.forEach((d, index) => {
          if (index === 0) {
            d._highlighted = true;
            setHighlightedNode(d);
          } else {
            d._upToTheRootHighlighted = true;
          }
          d._expanded = true;
        });

        // Update data and rerender graph
        chart.current.data(chartData).setCentered(id).render();

        return;
      }

      // Handle container click (highlight down)
      if (target.classList.contains("btr-node-icon")) {
        const chartData = chart.current.data() || [];
        const id = Number(target.getAttribute("data-node-id"));
        chart.current
          .clearHighlighting()
          .setUpToTheRootHighlighted(id)
          .render();
        setHighlightedNode(chartData.find((d) => d.id === id) || null);

        return;
      }
    },
    [chart, linksTimeout.current]
  );

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);

    // Deselect node after drawer has closed
    drawerTimeout.current && clearTimeout(drawerTimeout.current);
    drawerTimeout.current = setTimeout(() => {
      if (selectedNode) {
        setSelectedNode(null);
      }
    }, 300);
  };

  const handleFiltering = (value: FilterTogglesState) => {
    if (!chart.current) return;

    // Get options to add and remove from value
    const options = Object.keys(value).reduce<{
      add: string[];
      remove: string[];
    }>(
      (acc, key) => {
        if (value[key] === true) {
          acc["add"].push(key);
        } else {
          acc["remove"].push(key);
        }
        return acc;
      },
      { add: [], remove: [] }
    );

    // Dedupe and remove unselected
    const newFilters = Array.from(new Set([...filters, ...options.add])).filter(
      (f) => !options.remove.includes(f)
    );

    // Set the state
    setFilters(newFilters);

    // Get the data
    const chartData = chart.current.data() || [];

    // Prepare the data to dim (the unselected options)
    const filtered = chartData.filter(
      (d) =>
        !newFilters.includes(d.gender) ||
        !newFilters.includes(d.category) ||
        !newFilters.includes(d.type)
    );

    // Show all previously dimmed nodes
    chartData.forEach((d) => (d._dimmed = false));

    // Dim the nodes
    filtered.forEach((d) => {
      d._dimmed = true;
    });

    // Update data and rerender graph
    chart.current.data(chartData).render();
  };

  const handleShowFilters = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFiltersAnchorEl(event.currentTarget);
  };

  const handleHideFilters = () => {
    setFiltersAnchorEl(null);
  };

  /**
   * Get all the descendants of a node.
   */
  const getDescendants = (nodes: FamilyNode[], id: number) => {
    const descendants = nodes.filter((node) => node.id === id);

    function findChildren(parentId: number) {
      nodes.forEach((node) => {
        if (node.parentId === parentId) {
          descendants.push(node);
          findChildren(node.id);
        }
      });
    }

    findChildren(id);
    return descendants;
  };

  // Initialize the chart
  useLayoutEffect(() => {
    if (data && d3Container.current) {
      if (!chart.current) {
        chart.current = new OrgChart();
      }

      chart.current
        .container(d3Container.current as any)
        .compact(false)
        .data(data)
        .nodeWidth(() => 300)
        .nodeHeight(() => 150)
        .nodeUpdate(() => {}) // Clear defaults
        .linkUpdate(function (this: SVGPathElement, d) {
          d3.select(this)
            .attr("stroke", (d: any) =>
              d.data._upToTheRootHighlighted ? colors.black : colors.lightGrey
            )
            .attr("stroke-width", (d: any) =>
              d.data._upToTheRootHighlighted ? 5 : 1
            );

          if (d.data._upToTheRootHighlighted) {
            d3.select(this).raise();
          }
        })
        .nodeContent((d) => {
          return renderToStaticMarkup(<FamilyNodeContent node={d.data} />);
        })
        .expandAll()
        .render();
    }
  }, [data, chart, d3Container]);

  // Highlight node if id is set in query params
  useLayoutEffect(() => {
    if (!chart.current || !data) return;

    if (queryId) {
      const id = Number(queryId);
      const node = data.find((d) => d.id === id);
      if (node) {
        chart.current
          .expandAll()
          .clearHighlighting()
          .setHighlighted(id)
          .setCentered(id)
          .initialZoom(0.75)
          .render();

        setHighlightedNode(node);
        setSearchSelectedNode(node);
      }
    }
  }, [queryId, data]);

  // Add event listeners
  useLayoutEffect(() => {
    document.addEventListener("click", handleNodeClick);

    return () => {
      document.removeEventListener("click", handleNodeClick);
    };
  }, [handleNodeClick]);

  return (
    <>
      {(isLoading || !data) && <Loader />}
      {data && (
        <Wrapper isLoading={isLoading}>
          <Header>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <ActionButton
                onClick={handleExpandAll}
                title="Expand All"
                aria-label="Expand All"
              >
                <UnfoldMore />
              </ActionButton>
              <ActionButton
                onClick={handleCollapseAll}
                title="Collapse All"
                aria-label="Collapse All"
              >
                <UnfoldLess />
              </ActionButton>
              <ActionButton
                onClick={handleFit}
                title="Fit to Viewport"
                aria-label="Fit to Viewport"
              >
                <ZoomOutMap />
              </ActionButton>
              <ActionButton
                onClick={handleReset}
                title="Reset"
                aria-label="Reset"
              >
                <HighlightOff />
              </ActionButton>
              <ActionButton
                onClick={handleShowFilters}
                title="Filter"
                aria-label="Filter"
              >
                <FilterAlt />
              </ActionButton>
            </ButtonGroup>
            <SearchInput
              data={data}
              value={searchSelectedNode}
              inputValue={searchValue}
              onSearchChange={handleSearchChange}
              onSearchInputChange={handleSearchInputChange}
              onClearSearchInput={handleClearSearchInput}
            />
          </Header>
          <FilterTogglesWindow
            id={
              Boolean(filtersAnchorEl) ? "btr-filter-toggle-window" : undefined
            }
            open={Boolean(filtersAnchorEl)}
            anchorEl={filtersAnchorEl}
            keepMounted={true}
            onClose={handleHideFilters}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <FilterToggles
              ref={genderToggleRef}
              options={nodeGender as unknown as string[]}
              onChange={handleFiltering}
            />
            <FilterToggles
              ref={categoryToggleRef}
              options={nodeCategory as unknown as string[]}
              onChange={handleFiltering}
            />
            <FilterToggles
              ref={typeToggleRef}
              options={nodeType as unknown as string[]}
              onChange={handleFiltering}
            />
          </FilterTogglesWindow>
          <NotesDrawer
            open={isDrawerOpen}
            heading={selectedNode?.name || ""}
            text={selectedNode?.notes || "No notes."}
            onClose={handleDrawerClose}
          />
          <Canvas ref={d3Container} />
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading?: boolean }>(({ isLoading }) => ({
  visibility: isLoading ? "hidden" : "visible",
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  position: "fixed",
  pointerEvents: "none",
  padding: "16px",
  gap: "12px",
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    padding: "20px",
    gap: "20px",
  },

  [theme.breakpoints.up("md")]: {
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  },

  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${SIDEBAR_WIDTH_LG}px)`,
  },
}));

const ButtonGroup = styled(ButtonGroupBase)(({ theme }) => ({
  pointerEvents: "auto",
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    width: "auto",
    height: "57px",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.brand.xxLightGrey,
  color: theme.palette.brand.black,
  borderColor: `${theme.palette.brand.grey} !important`,

  "&:hover": {
    backgroundColor: theme.palette.brand.xLightGrey,
  },

  [theme.breakpoints.down("sm")]: {
    flex: 1,
  },
}));

const SearchInput = styled(SearchInputBase)(({ theme }) => ({
  pointerEvents: "auto",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const Canvas = styled("div")({
  "& > .svg-chart-container": {
    height: "100vh",
  },
});

const FilterTogglesWindow = styled(Popover)({
  ".MuiPaper-root": {
    padding: "10px 15px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "row",
  },
});
