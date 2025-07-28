import React, { useState, useCallback } from "react";
import AsyncSelect from "react-select/async";
import { getCountriesByName } from "@yusifaliyevpro/countries";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import type {
  Connection,
  Edge,
  Node,
  // ReactFlowInstance,
  NodeChange,
  EdgeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";

interface Option {
  value: string;
  label: string;
  flag: string;
}

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

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  // const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

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

  const loadOptionsOriginal = useCallback(
    async (inputValue: string): Promise<Option[]> => {
      const trimmedValue = inputValue.trim();

      if (!trimmedValue) {
        return [];
      }

      try {
        const countries = await getCountriesByName({
          name: trimmedValue,
          fields: ["name", "flag"],
        });

        if (!countries) {
          return [];
        }

        return countries.map((country) => ({
          value: country.name.common.toLowerCase().replace(/\s+/g, "-"),
          label: country.name.common,
          flag: country.flag,
        }));
      } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
      }
    },
    [],
  );

  const loadOptions = useDebounce(loadOptionsOriginal, 600);

  const handleChange = (option: Option | null) => {
    setSelectedOption(option);
  };

  const handleAddCountry = () => {
    if (!selectedOption) return;

    setAddedCountries([...addedCountries, selectedOption]);

    const newNode: Node = {
      id: `${selectedOption.value}_${Math.random()}`,
      data: { label: `${selectedOption.flag} ${selectedOption.label}` },
      position: { x: 50, y: 50 },
      type: "default",
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const formatOptionLabel = useCallback(
    (option: Option) => (
      <div className="flex items-center gap-2">
        <span className="text-xl">{option.flag}</span>
        <span>{option.label}</span>
      </div>
    ),
    [],
  );

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="p-4 flex gap-2 bg-white shadow z-10">
        <AsyncSelect<Option>
          value={selectedOption}
          onChange={handleChange}
          loadOptions={loadOptions}
          formatOptionLabel={formatOptionLabel}
          placeholder="Search for a country..."
          isClearable
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `No countries found for "${inputValue}"`
              : "Type to search countries"
          }
          styles={{
            container: (provided) => ({
              ...provided,
              width: "400px",
            }),
          }}
        />
        <button
          onClick={handleAddCountry}
          disabled={!selectedOption}
          className={`h-[38px] px-4 text-white border-none rounded text-sm ${
            selectedOption
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Add country
        </button>
      </div>

      <div className="w-full h-[calc(100vh-64px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // onInit={setReactFlowInstance}
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
