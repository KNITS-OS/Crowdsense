import { useEffect, useState } from "react";
import { SelectTag } from "types/types";
import { mapTags } from "utils";
import { getAllTags } from "utils/axios";
/**
 * @description this hook will return all tags
 */
export const useTags = () => {
  const [defaultTags, setDefaultTags] = useState<SelectTag[]>([]);

  useEffect(() => {
    const getDefaultTags = async () => {
      const { data } = await getAllTags();

      const selectTags: SelectTag[] = mapTags(data);

      setDefaultTags(selectTags);
    };
    getDefaultTags();
  }, []);

  return {
    defaultTags,
    setDefaultTags,
  };
};
