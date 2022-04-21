import {SearchIcon} from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

function Track({
  onHandleSearchChange,
  onSearch,
  value,
  isLoading = false,
  ...customProps
}: {
  onHandleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
  value: string;
  [key: string]: any;
}): JSX.Element {
  return (
    <Flex {...customProps} align="end" gap={3}>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          onChange={onHandleSearchChange}
          value={value}
          type="search"
          placeholder="Search"
          isDisabled={isLoading}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>): void => {
            if (event.key === 'Enter') {
              onSearch();
            }
          }}
        />
      </InputGroup>
      <Button
        onClick={onSearch}
        size="md"
        colorScheme="blue"
        type="button"
        width="110px"
        isLoading={isLoading}
      >
        Search
      </Button>
    </Flex>
  );
}

export default Track;
