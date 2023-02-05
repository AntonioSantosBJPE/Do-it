import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from "@chakra-ui/react";

import {
  useState,
  useEffect,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";

interface InputProps extends ChakraTextareaProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

type inputVariationOption = {
  [key: string]: string;
};

const inputVariation: inputVariationOption = {
  error: "red.500",
  default: "gray.200",
  focus: "purple.800",
  filled: "green.500",
};

const TextAreaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  InputProps
> = ({ name, error = null, icon: Icon, label, ...rest }, ref) => {
  const [variation, setVariation] = useState("default");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (error) {
      return setVariation("error");
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      return setVariation("focus");
    }
  }, [error]);

  const handleInputFBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel color="gray.400">{label}</FormLabel>}

      <InputGroup flexDirection="column">
        {Icon && (
          <InputLeftElement color={inputVariation[variation]} mt="2.5">
            <Icon />
          </InputLeftElement>
        )}
        <ChakraTextarea
          id={name}
          name={name}
          bg="gray.50"
          variant="outline"
          _hover={{ bgColor: "gray.100" }}
          _placeholder={{ color: "gray.300" }}
          _focus={{
            bg: "gray.100",
          }}
          size="lg"
          h="60px"
          color={inputVariation[variation]}
          borderColor={inputVariation[variation]}
          onFocus={handleInputFocus}
          onBlurCapture={handleInputFBlur}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          {...rest}
          ref={ref}
        />
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};

export const TextArea = forwardRef(TextAreaBase);
