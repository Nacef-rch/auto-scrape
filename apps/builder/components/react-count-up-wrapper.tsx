"use client";

import useMounted from "@/hooks/useMounted";
import React from "react";
import CountUp from "react-countup";

type Props = {
  value: number;
};

const ReactCountUpWrapper = ({ value }: Props) => {
  const mounted = useMounted();
  if (!mounted) return "-";
  return <CountUp duration={0.5} preserveValue end={value} decimals={0} />;
};

export default ReactCountUpWrapper;
