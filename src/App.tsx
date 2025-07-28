import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import type { Connection, Edge, Node, NodeChange, EdgeChange } from "reactflow";
import "reactflow/dist/style.css";
import { CountrySelector } from "./components/CountrySelector";
import type { Option } from "./types";

const initialNodes: Node[] = [
  {
    id: `germany_${Math.random()}`,
    data: { label: "🇩🇪 Germany" },
    position: { x: 250, y: 5 },
    type: "default",
  },
];

const initialEdges: Edge[] = [];

function App() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [addedCountries, setAddedCountries] = useState<Option[]>([]);
  const [lastNodePosition, setLastNodePosition] = useState({ x: 20, y: 20 });

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const handleCountryChange = (option: Option | null) => {
    setSelectedOption(option);
  };

  const handleAddCountry = () => {
    if (!selectedOption) return;

    setAddedCountries([...addedCountries, selectedOption]);

    const offsetX = 20;
    const offsetY = 20;
    const newPosition = {
      x: lastNodePosition.x + offsetX,
      y: lastNodePosition.y + offsetY,
    };

    const newNode: Node = {
      id: `${selectedOption.value}_${Math.random()}`,
      data: { label: `${selectedOption.flag} ${selectedOption.label}` },
      position: newPosition,
      type: "default",
    };

    setNodes((nds) => nds.concat(newNode));
    setLastNodePosition(newPosition);
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <CountrySelector
        selectedOption={selectedOption}
        onCountryChange={handleCountryChange}
        onAddCountry={handleAddCountry}
      />

      <div className="w-full h-[calc(100vh-64px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
