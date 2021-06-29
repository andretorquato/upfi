import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent bg="transparent">
        <ModalBody>
          <Image src={imgUrl} maxW="900px" maxH="600px" />
        </ModalBody>

        <ModalFooter justifyContent="flex-start">
          <Link href={imgUrl} isExternal textAlign="left" onClick={onClose}>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
}
