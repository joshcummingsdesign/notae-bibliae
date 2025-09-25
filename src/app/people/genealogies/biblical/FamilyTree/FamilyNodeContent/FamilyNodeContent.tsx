import { FC } from "react";
import styles from "./styles.module.scss";
import { combineClassNames as css } from "@/lib/utils/combineClassNames";
import { FamilyNode } from "@/app/api/family-tree/route";

interface Props {
  node: FamilyNode;
}

/**
 * This is appended to the DOM in an SVG, so SCSS must be used.
 */
export const FamilyNodeContent: FC<Props> = ({ node }) => {
  const {
    id,
    name,
    alt_names,
    gender,
    type,
    _dimmed,
    _highlighted,
    _upToTheRootHighlighted,
  } = node;
  return (
    <div
      className={css(
        styles.container,
        "btr-node-container",
        gender,
        _dimmed && "dimmed",
        (_highlighted || _upToTheRootHighlighted) && "highlighted"
      )}
      data-node-id={id}
    >
      <div className={styles.heading}>
        <h2
          className={css(styles.name, "btr-node-heading")}
          style={{ fontFamily: "var(--font-heading)" }}
          data-node-id={id}
        >
          {name}
        </h2>
        <button className={css(styles.icon, "btr-node-icon")} data-node-id={id}>
          <FamilyNodeIcon type={type} />
        </button>
      </div>
      <p className={styles.alt_names}>{alt_names?.join(", ")}</p>
    </div>
  );
};

const FamilyNodeIcon = ({ type }: { type: FamilyNode["type"] }) => {
  switch (type) {
    case "patriarch":
      return "👨‍👧‍👦";
    case "prophet":
      return "📖";
    case "priest":
      return "🙏";
    case "king":
      return "👑";
    case "nation":
      return "🌐";
    default:
      return "👤";
  }
};
