import React from 'react';
import ForceGraph2D from "force-graph";

function MindMap({ data }) {
  if (!data.nodes.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Process your text to see the AI-generated mind map</p>
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full">
      <ForceGraph2D
        graphData={data}
        nodeLabel="name"
        nodeColor={() => '#4f46e5'}
        linkColor={() => '#94a3b8'}
        nodeRelSize={6}
        linkWidth={2}
        linkDirectionalParticles={2}
      />
    </div>
  );
}

export default MindMap;