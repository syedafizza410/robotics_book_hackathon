import React, { useEffect, useState } from "react";
import OriginalDocItem from "@theme-original/DocItem";
import { getSession } from "../../utils/authClient";

export default function DocItemWrapper(props) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = "/login";
      } else {
        setAllowed(true);
      }
    });
  }, []);

  if (!allowed) return null;

  return <OriginalDocItem {...props} />;
}