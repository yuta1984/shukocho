import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import collection from '../collection.json';
type Props = {};

const Home: React.FC<Props> = () => {
  console.log('hoge');
  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h5'>
            聆涛閣集古帖ビューワー
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '84px 20px 0',
        }}
      >
        {collection.manifests.map((m) => {
          const id = m['@id']
            .split('/')
            .pop()!
            .replace('.json', '');
          const thumbnail = `https://khirin-i.rekihaku.ac.jp/iiif/ext/reitoukakushukocho/${id}/0002.tif/full/,300/0/default.jpg`;
          return (
            <Card
              key={id}
              style={{ width: 300, margin: '10px' }}
            >
              <CardActionArea href={'/viewer?id=' + id}>
                <CardMedia
                  style={{ height: 200 }}
                  image={thumbnail}
                  title='green iguana'
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                  >
                    {m.label}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='body2'
                    component='div'
                  >
                    資料番号: {id}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </>
  );
};
export default Home;
