import {
  Input as ChakraInput,
  Icon,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { IconType } from "react-icons";
import { FieldError } from "react-hook-form";

interface InputProps {
  type: string;
  label: string;
  icon: IconType;
  placeholder: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type, label, icon, placeholder, error, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel m="0" fontSize="sm" htmlFor={type}>
        {label}
      </FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={icon} color="gray.500" />
        </InputLeftElement>
        <ChakraInput
          type={type}
          placeholder={placeholder}
          _hover={{ bgColor: "none" }}
          borderColor="gray.400"
          ref={ref}
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
