import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Skeleton,
  Link
} from '@chakra-ui/react';

import { useState } from 'react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage(props: ModalViewImageProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <>
      <Modal 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      isCentered 
      size="4xl" 
      scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent bgColor="pGray.900">
          <ModalCloseButton/>
          <ModalBody px={60}   w="100%">
            <Skeleton isLoaded={!isLoading}>
              <Image
                src={props.imgUrl}
                objectFit="cover"
                w="100%"
                h="100%"
                maxHeight="900px"
                maxWidth="600px"
                borderTopRadius="md"
                onLoad={() => setIsLoading(false)}
                cursor="pointer"
              />
            </Skeleton>
          </ModalBody>
          <ModalFooter justifyContent="start">
            <Link href={props.imgUrl} isExternal >
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
