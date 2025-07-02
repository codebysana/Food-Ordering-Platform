import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = () => {
  return (
    <div>
      <Button disabled>
        <Loader2 className="mr-4 w-4 h-4 animate-spin" />
        Loading
      </Button>
    </div>
  );
};

export default LoadingButton;
