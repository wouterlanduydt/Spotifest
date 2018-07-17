import React from "react";

const DuoToneFilter = () => (
  <svg xmlns="http://www.w3.org/2000/svg">
    <filter id="peachy">
      <feColorMatrix
        type="matrix"
        result="gray"
        values="1 0 0 0 0 
                    1 0 0 0 0
                    1 0 0 0 0
                    0 0 0 1 0"
      />

      <feComponentTransfer colorInterpolationFilters="sRGB" result="duotone">
        <feFuncR type="table" tableValues="0.9294117647 0.9960784314" />
        <feFuncG type="table" tableValues="0.2431372549 0.7803921569" />
        <feFuncB type="table" tableValues="0.6431372549 0.4235294118" />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
    </filter>
  </svg>
);

export default DuoToneFilter;
