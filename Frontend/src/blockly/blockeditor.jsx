// import React, { useEffect, useRef } from "react";
// import * as Blockly from "blockly";
// import toolboxConfig from "./toolboxConfig";

// // import your custom blocks BEFORE inject
// import "./blocks";  

// export default function BlocklyEditor() {
//   const blocklyDiv = useRef(null);
//   const workspaceRef = useRef(null);

//   useEffect(() => {
//     if (workspaceRef.current) return; // prevent re-inject

//     workspaceRef.current = Blockly.inject(blocklyDiv.current, {
//       toolbox: toolboxConfig,
//       scrollbars: true,
//       trashcan: true,
//       renderer: "zelos", // smoother rendering
//     });

//     // Fix resize flicker
//     setTimeout(() => {
//       Blockly.svgResize(workspaceRef.current);
//     }, 100);

//   }, []);

//   return (
//     <div
//       ref={blocklyDiv}
//       style={{
//         height: "100vh",
//         width: "100%",
//       }}
//     />
//   );
// }