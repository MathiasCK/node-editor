import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type Edge,
  type Connection,
  Background,
  addEdge,
  Panel,
  EdgeTypes,
  NodeTypes,
} from 'reactflow';
import { shallow } from 'zustand/shallow';

import 'reactflow/dist/style.css';
import { Block, Connector, Terminal, TextBox } from './components/Nodes';
import { buttonVariants } from './lib/config';
import { AspectType, NodeType } from './lib/types';
import { addNode, checkConnection, handleNewNodeRelations } from './lib/utils';
import { storeSelector, useConnection, useStore, useTheme } from './hooks';

import { Connected, Fulfilled, Part, Transfer } from './components/Edges';
import {
  ControlsStyled,
  MiniMapStyled,
  ReactFlowStyled,
  darkTheme,
  lightTheme,
} from './components/ui/styled';
import { ThemeProvider } from 'styled-components';
import { Sidebar, Settings, SelectConnection } from './components/ui';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import ProtectedRoutes from "./components/Session/ProtectedRoute";

  const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "login",
		element: (
			<>
				<h1>Please log in</h1>
				<p>This is where you authenticate and get a session or jwt.</p>
			</>
		),
	},
	{
		element: <ProtectedRoutes />,
		children: [
			{
				path: "admin",
				element: (
					<>
						<p>This is admin page.</p>
					</>
				),
			},
			{
				path: "user",
				element: (
					<>
						<p>This is user page.</p>
					</>
				),
			},
			{
				path: "guest",
				element: (
					<>
						<p>This is guest page.</p>
					</>
				),
			},
		],
	},
]);




export default function App() {

  const nodeTypes = useMemo(
    () => ({
      block: Block,
      connector: Connector,
      terminal: Terminal,
      textbox: TextBox,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      part: Part,
      connected: Connected,
      fulfilled: Fulfilled,
      transfer: Transfer,
    }),
    []
  );

  const { theme } = useTheme();
  const { edgeType, openDialog } = useConnection();
  const [params, setParams] = useState<Edge | Connection | null>();
  const [displayDialog, setDisplayDialog] = useState<boolean>(true);

  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } =
    useStore(storeSelector, shallow);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const createNewConnection = () => {
    if (!params) return;

    const { connectionType, lockConnection, newNodeRelations } =
      checkConnection(params, edgeType, nodes);

    const currentDate = Date.now();
    const id = edges.length.toString();
    const newConnection = {
      ...params,
      type: connectionType,
      data: {
        id,
        label: `Edge ${id}`,
        type: connectionType,
        lockConnection,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    };

    handleNewNodeRelations(newNodeRelations, nodes, setNodes);

    const newEdges = addEdge(newConnection, edges);
    return setEdges(newEdges);
  };

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const { canConnect, lockConnection } = checkConnection(
        params,
        edgeType,
        nodes
      );
      if (!canConnect) return;

      if (lockConnection) {
        setDisplayDialog(false);
      } else {
        setDisplayDialog(true);
      }
      openDialog();
      setParams(params);
    },
    [edgeType, openDialog, nodes]
  );

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <ReactFlowStyled
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes as unknown as NodeTypes}
        edgeTypes={edgeTypes as unknown as EdgeTypes}
      >
        <Sidebar />
        <Settings />
        <SelectConnection
          displayDialog={displayDialog}
          createNewConnection={createNewConnection}
        />
        <Panel
          position="top-right"
          className="w-100 flex h-full flex-col justify-center"
        >
          <button
            className={
              theme === 'light' ? buttonVariants.button : buttonVariants.textbox
            }
            onClick={() =>
              addNode('white' as AspectType, NodeType.TextBox, nodes, setNodes)
            }
          >
            Add TextBox
          </button>
        </Panel>
        <ControlsStyled />
        <MiniMapStyled />
        <Background gap={12} size={1} />
      </ReactFlowStyled>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
