import { SimpleGrid, useDisclosure, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const viewImageHandler = (url: string):void => {
    setImageUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={4} spacing={10}>
        {
          cards.map(card =>
          (
            <Box>
              <Card data={card} viewImage={viewImageHandler} key={card.id} />
            </Box>
          ))
        }
      </SimpleGrid>

      <ModalViewImage imgUrl={imageUrl} isOpen={isOpen} onClose={onClose}/>
    </>
  );
}
