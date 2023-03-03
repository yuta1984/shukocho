import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import React, {
  useState,
  useCallback,
  useMemo,
  useContext,
  useRef,
  useLayoutEffect,
  ReactNode,
  useEffect,
} from 'react';
//import "universalviewer";
import { Viewer } from 'universalviewer';
import 'universalviewer/dist/esm/index.css';
import collection from '../collection.json';
const UVContext = React.createContext({});

// This would be the "wrapper" around the root of the React app.
const UVProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // First you'll want to enable the UV to register itself with your context.
  const [uvInstance, setUvInstance] = useState<any>();

  // Maybe hold some state in the UV.
  const [uvConfig, setUvConfig] = useState({});

  // Maybe expose some functinos in your hook
  const triggerSomethingOnTheUv = useCallback(() => {
    if (uvInstance) {
      uvInstance.trigger('some_event');
      /// ...
    }
  }, [uvInstance]);

  // Wrap it in memo to avoid it changing. This is what the hook would get.
  const fullContext = useMemo(
    () => ({
      triggerSomethingOnTheUv,
      uvConfig,
      uvInstance,
      setUvInstance,
      setUvConfig,
    }),
    [triggerSomethingOnTheUv, uvConfig, uvInstance]
  );

  return (
    <UVContext.Provider value={fullContext}>
      {children}
    </UVContext.Provider>
  );
};

// Now you can create your hooks.
const useUV = () => {
  return useContext(UVContext);
};

// Can decompose these down to custom hooks.
// const useUVConfig = () => {
//   const uv = useUV();

//   return uv.uvConfig;
// };

// Now when you create a component that loads the UV.
const UniversalViewer = ({
  manifest,
}: {
  manifest: string;
}) => {
  const uvDiv = useRef<any>();
  const uv = useUV();

  // When you create your UV instance
  useLayoutEffect(() => {
    new Viewer({
      target: uvDiv.current,
      data: {
        manifest: manifest,
        embedded: true,
      } as any,
    });

    // var uv = createUV(uvDiv.current, {
    //   manifestUri: "http://wellcomelibrary.org/iiif/b18035723/manifest",
    //   assetsDir: "uv/uv-assets",
    //   configUri: "uv-config.json"
    // }, new UV.URLDataProvider());
    // initUV(uvDiv.current).then(uvInstance => {
    // Use use your hook to set it on the context. This will make it available to everywhere
    // else in your application.
    //  uv.setUvInstance(uvInstance);
    //});
  }, [uv, manifest]);

  return <div ref={uvDiv} id='uv' className='uv' />;
};

export default function App() {
  const urlSearchParams = new URLSearchParams(
    window.location.search
  );
  const params = Object.fromEntries(
    urlSearchParams.entries()
  );
  const id = params.id;
  const m = collection.manifests.find((m) =>
    m['@id'].includes(id)
  );
  console.log(m);
  const label = m!.label;
  const manifest = m!['@id'];

  useEffect(() => {
    setTimeout(() => {
      console.log('back to top');
      window.location.replace('/');
    }, 1000 * 60 * 5);
  }, []);

  return (
    <UVProvider>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h5' sx={{ flexGrow: 1 }}>
            {label}
          </Typography>
          <Button
            variant='contained'
            color='secondary'
            href='/'
          >
            トップに戻る
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: '64px' }}>
        <div id='uv'></div>

        <div
          className='uv'
          style={{
            height: 'calc(100vh - 64px)',
          }}
        >
          <UniversalViewer manifest={manifest} />
        </div>
      </Box>
    </UVProvider>
  );
}
