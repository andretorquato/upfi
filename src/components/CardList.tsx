import { Box, Image, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
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
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={3} spacing="10">
        {cards.map(card => (
          <Box
            key={card.id}
            maxH="72"
            maxW="80"
            height="72"
            width="80"
            bg="gray.800"
            borderRadius="6px"
            cursor="pointer"
          >
            <Image src={card.url} width="full" height="40" fit="cover" />
            <Text>{card.title}</Text>
            <Text>{card.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
