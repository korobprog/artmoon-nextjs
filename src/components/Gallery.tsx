'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface Artwork {
  id: number;
  title: string;
  author: string;
  size: string;
  price: string;
  url: string;
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: 'Картина №2275',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000 р.',
    url: '/images/Армандо-Романо-Италия-2275-95х75см_-1500x1189.webp',
  },
  {
    id: 2,
    title: 'Картина №2276',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000 р.',
    url: '/images/Армандо-Романо-Италия-2276-95х75см-1500x1194.webp',
  },
  {
    id: 3,
    title: 'Картина №2277',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000 р.',
    url: '/images/Армандо-Романо-Италия-2277-95х75см-1500x1192.webp',
  },
  {
    id: 4,
    title: 'Картина №2279',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000 р.',
    url: '/images/Армандо-Романо-Италия-2279-95х75см_-1500x1181.webp',
  },
  {
    id: 5,
    title: 'Картина №2280',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000 р.',
    url: '/images/Армандо-Романо-Италия-2280-95х75см-1500x1180.webp',
  },
  {
    id: 6,
    title: 'Картина №2281',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000 р.',
    url: '/images/Армандо-Романо-Италия-2281-95х75см-1500x1190.webp',
  },
  {
    id: 7,
    title: 'Картина №2262',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000 р.',
    url: '/images/Армандо-Романо-Италия-2262-95х75см-1-1500x1186.webp',
  },
  {
    id: 8,
    title: 'Картина №2263',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000 р.',
    url: '/images/Армандо-Романо-Италия-2263-95х75см-1500x1184.webp',
  },
  {
    id: 9,
    title: 'Картина №2265',
    author: 'Армандо Романо (Италия)',
    size: '115х85см',
    price: '357 000 р.',
    url: '/images/Армандо-Романо-Италия-2265-115х85см-1500x1112.webp',
  },
  {
    id: 10,
    title: 'Картина №2266',
    author: 'Армандо Романо (Италия)',
    size: '145х85см',
    price: '470 000 р.',
    url: '/images/Армандо-Романо-Италия-2266-145х85см-1500x883.webp',
  },
  {
    id: 11,
    title: 'Картина №2282',
    author: 'Наварро Монтллор (Испания)',
    size: '145х115см',
    price: '2 190 000 р.',
    url: '/images/Наварро-Монтллор-Испания-2282-145х115см.webp',
  },
  {
    id: 12,
    title: 'Картина №2305',
    author: 'Мартина Йона (Испания)',
    size: '86х75см',
    price: '270 000 р.',
    url: '/images/Мартина-Йона-Испания-2305-86х75см-1500x1315.webp',
  },
  {
    id: 13,
    title: 'Картина №2304',
    author: 'Мартина Йона (Испания)',
    size: '98х84см',
    price: '380 000 р.',
    url: '/images/Мартина-Йона-Испания-2304-98х84см-1500x1294.webp',
  },
  {
    id: 14,
    title: 'Картина №2302',
    author: 'Мартина Йона (Испания)',
    size: '80х70см',
    price: '270 000 р.',
    url: '/images/Мартина-Йона-Испания-2302-80х70см-1500x1330.webp',
  },
  {
    id: 15,
    title: 'Картина №2300',
    author: 'Мартина Йона (Испания)',
    size: '71х80см',
    price: '270 000 р.',
    url: '/images/Мартина-Йона-Испания-2300-71х80см-1323x1500.webp',
  },
  {
    id: 16,
    title: 'Картина №2259',
    author: 'Мартина Йона (Испания)',
    size: '98х85см',
    price: '390 000 р.',
    url: '/images/Мартина-Йона-Испания-2259-98х85см-1500x1301.webp',
  },
  {
    id: 17,
    title: 'Картина №2260',
    author: 'Мартина Йона (Испания)',
    size: '98х85см',
    price: '390 000 р.',
    url: '/images/Мартина-Йона-Испания-2260-98х85см-1500x1299.webp',
  },
  {
    id: 18,
    title: 'Картина №2309',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '584 000 р.',
    url: '/images/Хавьер-Мулио-Испания-2309-45х55см.webp',
  },
  {
    id: 19,
    title: 'Картина №2307',
    author: 'Хавьер Мулио (Испания)',
    size: '106х85см',
    price: '2 124 000 р.',
    url: '/images/Хавьер-Мулио-Испания-____-106х85см.webp',
  },
  {
    id: 20,
    title: 'Картина №2288',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '567 000 р.',
    url: '/images/Хавьер-Мулио-Испания-2288-45х55см.webp',
  },
  {
    id: 21,
    title: 'Картина №2285',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '584 000 р.',
    url: '/images/Хавьер-Мулио-Испания-2285-45х55см.webp',
  },
  {
    id: 22,
    title: 'Картина №2286',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '567 000 р.',
    url: '/images/Хавьер-Мулио-Испания-2286-45х55см.webp',
  },
  {
    id: 23,
    title: 'Картина №2287',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '584 000 р.',
    url: '/images/Хавьер-Мулио-Испания-2287-45х55см.webp',
  },
  {
    id: 24,
    title: 'Картина №2289',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '584 000 р.',
    url: '/images/Хавьер-Мулио-Испания-2289-45х55см.webp',
  },
  {
    id: 25,
    title: 'Картина №2290',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '584 000 р.',
    url: '/images/Хавьер-Мулио-Испания-2290-45х55см.webp',
  },
  {
    id: 26,
    title: 'Картина №2291',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '567 000 р.',
    url: '/images/Хавьер-Мулио-Испания-2291-45х55см.webp',
  },
  {
    id: 27,
    title: 'Картина №2271',
    author: 'Хавьер Мулио (Испания)',
    size: '63х75см',
    price: '1 656 000 р.',
    url: '/images/Хавьер-Мулио-Испания-2271-63х75см-1268x1500.webp',
  },
  {
    id: 28,
    title: 'Картина №2273',
    author: 'Хавьер Мулио (Испания)',
    size: '106х85см',
    price: '2 124 000 р.',
    url: '/images/Хавьер-Мулио-Испания-2273-106х85см-1500x1204.webp',
  },
  {
    id: 29,
    title: 'Картина №568',
    author: 'Соледад Фернандез (Испания)',
    size: '122х92см',
    price: '1 759 000 р.',
    url: '/images/568-1500x1144.webp',
  },
  {
    id: 30,
    title: 'Картина №2295',
    author: 'Маркос Эстеве (Испания)',
    size: '104х62см',
    price: '450 000 р.',
    url: '/images/Маркос-Эстеве-Испания-2295-104х62см-1500x893.webp',
  },
  {
    id: 31,
    title: 'Картина №2296',
    author: 'Маркос Эстеве (Испания)',
    size: '104х62см',
    price: '450 000 р.',
    url: '/images/Маркос-Эстеве-Испания-2295-104х62см-1500x893.webp',
  },
  {
    id: 32,
    title: 'Картина №958',
    author: 'Герман Арасил (Испания)',
    size: '91х68см',
    price: '250 000 р.',
    url: '/images/Герман-Арасил-Испания-958-91х68см.webp',
  },
  {
    id: 33,
    title: 'Картина №1526',
    author: 'Г.Голиа (Италия)',
    size: '95х75см',
    price: '264 000 р.',
    url: '/images/Голиа-Италия-1526-95х75см.2745-евро-1500x1179.webp',
  },
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const handleClickOpen = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArtwork(null);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Галерея */}
      <Grid
        container
        spacing={2}
        sx={{
          padding: '16px',
          justifyContent: { xs: 'center', sm: 'flex-start' },
        }}
      >
        {artworks.map((artwork) => (
          <Grid item xs={12} sm={6} md={4} key={artwork.id}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto',
                cursor: 'pointer',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
              }}
              onClick={() => handleClickOpen(artwork)}
            >
              <div
                style={{
                  width: '100%',
                }}
              >
                <Image
                  src={artwork.url}
                  alt={artwork.title}
                  layout="responsive"
                  width={500}
                  height={500}
                  objectFit="cover"
                  style={{ borderRadius: '4px' }}
                />
              </div>
              <div
                style={{ padding: '8px 0', textAlign: 'left', width: '100%' }}
              >
                <Typography variant="body2" color="text.primary">
                  <strong>Автор:</strong> {artwork.author}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>Размер:</strong> {artwork.size}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>Цена:</strong> {artwork.price} ₽
                </Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Диалог для увеличенного изображения */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ overflowX: 'hidden' }}>
          {selectedArtwork && (
            <>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                <Image
                  src={selectedArtwork.url}
                  alt={selectedArtwork.title}
                  layout="responsive"
                  width={1000}
                  height={1000}
                  objectFit="contain"
                  style={{ borderRadius: '4px' }}
                />
              </div>
              <Typography variant="body1" gutterBottom>
                <strong>Автор:</strong> {selectedArtwork.author}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Размер:</strong> {selectedArtwork.size}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Цена:</strong> {selectedArtwork.price} ₽
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
