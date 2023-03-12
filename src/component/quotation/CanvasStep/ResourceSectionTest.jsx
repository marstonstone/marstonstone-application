import React from 'react';
import { styled } from '@mui/material/styles';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ImageList as imageList } from '../images/images';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 300;

const ExpandIconButton = styled(IconButton)({
  marginLeft: 'auto',
});

const DrawerPaper = styled('div')(({ theme }) => ({
  width: drawerWidth,
  padding: theme.spacing(2),
}));

const Content = styled('div')({
  flexGrow: 1,
  padding: 16,
});

const ImageList = styled(List)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  gap: 16,
  marginBottom: 16,
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  //   objectFit: 'cover',
});

// const imageList = [
//   {
//     src: 'https://material-ui.com/static/images/image-list/breakfast.jpg',
//     label: 'Breakfast',
//     id: 'jill111',
//   },
//   {
//     src: 'https://material-ui.com/static/images/image-list/burgers.jpg',
//     label: 'Tasty burger',
//     id: 'director90',
//   },
//   {
//     src: 'https://material-ui.com/static/images/image-list/camera.jpg',
//     label: 'Camera',
//     id: 'Danson67',
//   },
//   {
//     src: 'https://material-ui.com/static/images/image-list/morning.jpg',
//     label: 'Morning',
//     id: 'fancycrave1',
//   },
//   {
//     src: 'https://material-ui.com/static/images/image-list/hats.jpg',
//     label: 'Hats',
//     id: 'Hans',
//   },
//   {
//     src: 'https://material-ui.com/static/images/image-list/vegetables.jpg',
//     label: 'Vegetables',
//     id: 'jill111',
//   },
//   {
//     src: 'https://material-ui.com/static/images/image-list/plant.jpg',
//     label: 'Water plant',
//     id: 'BkrmadtyaKarki',
//   },
//   {
//     src: 'https://material-ui.com/static/images/image-list/mushroom.jpg',
//     label: 'Mushrooms',
//     id: 'PublicDomainPictures',
//   },
//   {
//     src: 'https://material-ui.com/static/images/image-list/olive.jpg',
//     label: 'Olive oil',
//     id: 'congerdesign',
//   },
//   {
//     src: 'https://material-ui.com/static/images/image-list/star.jpg',
//     label: 'Sea star',
//     id: '821292',
//   },
//   {
//     src: 'https://material-ui.com/static/images/image-list/bike.jpg',
//     label: 'Bike',
//     id: 'danfador',
//   },
// ];

export default function ImageListDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ExpandIconButton onClick={handleDrawerOpen}>
        <ExpandMoreIcon />
      </ExpandIconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: drawerWidth },
        }}
      >
        <DrawerPaper>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>

          <ImageList cols={2} gap={8}>
            {imageList.map((item) => (
              <ImageListItem key={item.img}>
                <Image src={item.src} alt={item.label} />
                <ImageListItemBar title={item.label} />
              </ImageListItem>
            ))}
          </ImageList>
          <Divider />
          <List>{/* Add any additional items to the drawer here */}</List>
        </DrawerPaper>
      </Drawer>
      {/* <Content>Something here</Content> */}
    </React.Fragment>
  );
}
