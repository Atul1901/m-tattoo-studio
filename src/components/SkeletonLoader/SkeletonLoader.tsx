const SkeletonLoader = ({ viewStyle = {}, skeletonBgColor = "#EFF1F3" }) => {
  return (
    <div
      style={{
        ...viewStyle,
        backgroundColor: skeletonBgColor,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(
            90deg,
            ${skeletonBgColor} 0%,
            #fff 50%,
            ${skeletonBgColor} 100%
          )`,
          transform: "translateX(-100%)",
          animation: "shimmer 1.6s ease-in-out infinite",
        }}
      />
    </div>
  );
};

export default SkeletonLoader;
