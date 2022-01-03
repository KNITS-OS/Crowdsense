import { useEffect, useState } from "react";
import { Tag } from "types/types";
import { getAllTags } from "utils/axios";
/**
 * @description this hook will return all tags
 */
const useTags = () => {
  const [defaultTags, setDefaultTags] = useState<Tag[]>([]);
  useEffect(() => {
    const getDefaultTags = async () => {
      const { data } = await getAllTags();

      setDefaultTags(data);
    };
    getDefaultTags();
  }, []);
  return {
    defaultTags,
  };
};

export default useTags;
