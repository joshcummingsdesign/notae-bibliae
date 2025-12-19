"use client";
import { useEffect } from "react";

export const OpeningSentence = () => {
  useEffect(() => {
    fetch(`/api/bible?query=1%20Chron.%2016%3A28-29%2C31`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return "Hello";
};
