import clsx from "clsx";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div className={clsx("spinner", className)}>
      <div className="dot1"></div>
      <div className="dot2"></div>
    </div>
  );
}
