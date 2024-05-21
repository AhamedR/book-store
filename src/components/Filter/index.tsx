"use Client";

import { useState } from "react";
import {
  CloseButton,
  Flex,
  Grid,
  Input,
  Select,
  TextInput,
  rem,
} from "@mantine/core";
import { IconSortDescending, IconSearch } from "@tabler/icons-react";
import { useBookStore } from "@/providers/bookStoreProvider";
import { SortOrder } from "@/api";

const Filter = () => {
  const [searchValue, setSearchValue] = useState("");
  const { searchBooks, filterBooks } = useBookStore((state) => state);

  const handleSearch = (searchTerm: string) => {
    setSearchValue(searchTerm);
    searchBooks(searchTerm);
  };

  const handleSortChange = (value: SortOrder = "all") => {
    filterBooks(value, searchValue);
  };

  // UI
  const icon = (
    <IconSortDescending style={{ width: rem(16), height: rem(16) }} />
  );
  const searchIcon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

  return (
    <Grid mb="md">
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <TextInput
          width="100%"
          label="Search"
          placeholder="Title, Author"
          leftSection={searchIcon}
          value={searchValue}
          onChange={(event) => handleSearch(event.currentTarget.value)}
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => handleSearch("")}
              style={{ display: searchValue ? undefined : "none" }}
            />
          }
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <Select
          data={[
            { value: "all", label: "All" },
            { value: "low", label: "Low - Expensive" },
            { value: "high", label: "Expensive - Low" },
          ]}
          leftSectionPointerEvents="none"
          leftSection={icon}
          defaultValue="all"
          placeholder="Sort by price"
          label="Sort by price"
          onChange={handleSortChange}
        />
      </Grid.Col>
    </Grid>
  );
};

export default Filter;
