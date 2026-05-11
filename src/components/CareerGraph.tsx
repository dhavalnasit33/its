// src/components/CareerGraph.tsx
"use client";

import React, { useMemo, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode, { CustomNodeData } from "./CustomNode";

// --- Node and Edge data remains the same ---
const initialNodes: Node<CustomNodeData>[] = [
  { id: "root", type: "custom", position: { x: 881, y: 0 }, data: { label: "Career Options", variant: "category" } },
  { id: "programming", type: "custom", position: { x: 581, y: 100 }, data: { label: "Programming", variant: "category" } },
  { id: "non-programming", type: "custom", position: { x: 1531, y: 100 }, data: { label: "Non Programming", variant: "category" } },
  { id: "mobile", type: "custom", position: { x: 281, y: 200 }, data: { label: "Mobile", variant: "category" } },
  { id: "web", type: "custom", position: { x: 981, y: 200 }, data: { label: "Web", variant: "category" } },
  { id: "gaming", type: "custom", position: { x: 31, y: 300 }, data: { label: "Gaming", variant: "category" } },
  { id: "unity", type: "custom", position: { x: 0, y: 365 }, data: { label: "Unity", imageUrl: "/training/unity.svg", variant: "technology" } },
  { id: "application", type: "custom", position: { x: 381, y: 300 }, data: { label: "Application", variant: "category" } },
  { id: "native", type: "custom", position: { x: 231, y: 400 }, data: { label: "Native", variant: "category" } },
  { id: "android", type: "custom", position: { x: 196, y: 465 }, data: { label: "Android", imageUrl: "/training/android.svg", variant: "technology" } },
  { id: "ios", type: "custom", position: { x: 196, y: 600 }, data: { label: "iOS", imageUrl: "/training/ios.svg", variant: "technology" } },
  { id: "hybrid", type: "custom", position: { x: 531, y: 400 }, data: { label: "Hybrid", variant: "category" } },
  { id: "react-native", type: "custom", position: { x: 496, y: 465 }, data: { label: "React Native", imageUrl: "/training/react.svg", variant: "technology" } },
  { id: "flutter", type: "custom", position: { x: 496, y: 600 }, data: { label: "Flutter", imageUrl: "/training/flutter.svg", variant: "technology" } },
  { id: "ionic", type: "custom", position: { x: 496, y: 735 }, data: { label: "Ionic", imageUrl: "/training/ionic.svg", variant: "technology" } },
  { id: "frontend", type: "custom", position: { x: 731, y: 300 }, data: { label: "Front End", variant: "category" } },
  { id: "html-css", type: "custom", position: { x: 707, y: 365 }, data: { label: "HTML/CSS", imageUrl: "/training/html.svg", variant: "technology" } },
  { id: "javascript", type: "custom", position: { x: 707, y: 500 }, data: { label: "Java Script", imageUrl: "/training/javascript.svg", variant: "technology" } },
  { id: "angular", type: "custom", position: { x: 707, y: 635 }, data: { label: "Angular", imageUrl: "/training/angular.svg", variant: "technology" } },
  { id: "reactjs", type: "custom", position: { x: 707, y: 775 }, data: { label: "React JS", imageUrl: "/training/react.svg", variant: "technology" } },
  { id: "backend", type: "custom", position: { x: 964, y: 300 }, data: { label: "Back End", variant: "category" } },
  { id: "php", type: "custom", position: { x: 938, y: 365 }, data: { label: "PHP", imageUrl: "/training/php.svg", variant: "technology" } },
  { id: "python", type: "custom", position: { x: 938, y: 500 }, data: { label: "Python", imageUrl: "/training/python.svg", variant: "technology" } },
  { id: "nodejs", type: "custom", position: { x: 938, y: 635 }, data: { label: "Node JS", imageUrl: "/training/node.svg", variant: "technology" } },
  { id: "server", type: "custom", position: { x: 1221, y: 300 }, data: { label: "Server", variant: "category" } },
  { id: "linux", type: "custom", position: { x: 1186, y: 365 }, data: { label: "Linux", imageUrl: "/training/linux.svg", variant: "technology" } },
  { id: "aws", type: "custom", position: { x: 1186, y: 500 }, data: { label: "AWS", imageUrl: "/training/aws.svg", variant: "technology" } },
  { id: "ci-cd", type: "custom", position: { x: 1186, y: 635 }, data: { label: "CI/CD", imageUrl: "/training/cicd.svg", variant: "technology" } },
  { id: "networking", type: "custom", position: { x: 1186, y: 775 }, data: { label: "Networking", imageUrl: "/training/network.svg", variant: "technology" } },
  { id: "ui-ux", type: "custom", position: { x: 1431, y: 200 }, data: { label: "UI/UX", variant: "category" } },
  { id: "photoshop", type: "custom", position: { x: 1394, y: 265 }, data: { label: "Photoshop", imageUrl: "/training/photoshop.svg", variant: "technology" } },
  { id: "illustrator", type: "custom", position: { x: 1394, y: 400 }, data: { label: "Illustrator", imageUrl: "/training/illustrator.svg", variant: "technology" } },
  { id: "figma", type: "custom", position: { x: 1394, y: 535 }, data: { label: "Figma", imageUrl: "/training/figma.svg", variant: "technology" } },
  { id: "sketch", type: "custom", position: { x: 1394, y: 670 }, data: { label: "Sketch", imageUrl: "/training/sketch.svg", variant: "technology" } },
  { id: "xd", type: "custom", position: { x: 1394, y: 810 }, data: { label: "XD", imageUrl: "/training/xd.svg", variant: "technology" } },
  { id: "seo", type: "custom", position: { x: 1731, y: 200 }, data: { label: "SEO", variant: "category" } },
  { id: "search-engine", type: "custom", position: { x: 1686, y: 265 }, data: { label: "Search Engine Optimization", imageUrl: "/training/seo.svg", variant: "technology" } },
];
const initialEdges: Edge[] = [
  { id: "e-root-programming", source: "root", target: "programming", type: "smoothstep" },
  { id: "e-root-non-programming", source: "root", target: "non-programming", type: "smoothstep" },
  { id: "e-programming-mobile", source: "programming", target: "mobile", type: "smoothstep" },
  { id: "e-programming-web", source: "programming", target: "web", type: "smoothstep" },
  { id: "e-mobile-gaming", source: "mobile", target: "gaming", type: "smoothstep" },
  { id: "e-mobile-application", source: "mobile", target: "application", type: "smoothstep" },
  { id: "e-gaming-unity", source: "gaming", target: "unity", type: "smoothstep" },
  { id: "e-application-native", source: "application", target: "native", type: "smoothstep" },
  { id: "e-application-hybrid", source: "application", target: "hybrid", type: "smoothstep" },
  { id: "e-native-android", source: "native", target: "android", type: "smoothstep" },
  { id: "e-native-ios", source: "native", target: "ios", type: "smoothstep" },
  { id: "e-hybrid-rn", source: "hybrid", target: "react-native", type: "smoothstep" },
  { id: "e-hybrid-flutter", source: "hybrid", target: "flutter", type: "smoothstep" },
  { id: "e-hybrid-ionic", source: "hybrid", target: "ionic", type: "smoothstep" },
  { id: "e-web-frontend", source: "web", target: "frontend", type: "smoothstep" },
  { id: "e-web-backend", source: "web", target: "backend", type: "smoothstep" },
  { id: "e-web-server", source: "web", target: "server", type: "smoothstep" },
  { id: "e-frontend-html", source: "frontend", target: "html-css", type: "smoothstep" },
  { id: "e-frontend-js", source: "frontend", target: "javascript", type: "smoothstep" },
  { id: "e-frontend-angular", source: "frontend", target: "angular", type: "smoothstep" },
  { id: "e-frontend-react", source: "frontend", target: "reactjs", type: "smoothstep" },
  { id: "e-backend-php", source: "backend", target: "php", type: "smoothstep" },
  { id: "e-backend-python", source: "backend", target: "python", type: "smoothstep" },
  { id: "e-backend-node", source: "backend", target: "nodejs", type: "smoothstep" },
  { id: "e-server-linux", source: "server", target: "linux", type: "smoothstep" },
  { id: "e-server-aws", source: "server", target: "aws", type: "smoothstep" },
  { id: "e-server-cicd", source: "server", target: "ci-cd", type: "smoothstep" },
  { id: "e-server-networking", source: "server", target: "networking", type: "smoothstep" },
  { id: "e-non-programming-uiux", source: "non-programming", target: "ui-ux", type: "smoothstep" },
  { id: "e-non-programming-seo", source: "non-programming", target: "seo", type: "smoothstep" },
  { id: "e-uiux-photoshop", source: "ui-ux", target: "photoshop", type: "smoothstep" },
  { id: "e-uiux-illustrator", source: "ui-ux", target: "illustrator", type: "smoothstep" },
  { id: "e-uiux-figma", source: "ui-ux", target: "figma", type: "smoothstep" },
  { id: "e-uiux-sketch", source: "ui-ux", target: "sketch", type: "smoothstep" },
  { id: "e-uiux-xd", source: "ui-ux", target: "xd", type: "smoothstep" },
  { id: "e-seo-searchengine", source: "seo", target: "search-engine", type: "smoothstep" },
];

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "#9ca3af" },
  type: "smoothstep",
};

function Flow() {
  const { fitView } = useReactFlow();
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  useEffect(() => {
    const handleResize = () => {
      fitView({ duration: 200 });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [fitView]);

  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
      nodesDraggable={false}
      elementsSelectable={false}
      zoomOnScroll={false}
      panOnDrag={false}
      panOnScroll={false}
      zoomOnDoubleClick={false}
      proOptions={{ hideAttribution: true }}
      preventScrolling={false}
    />
  );
}

export default function CareerGraph() {
  return (
    // 👇 THE ONLY CHANGE IS HERE 👇
    <div className="w-full aspect-2/1 max-h-screen">
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}