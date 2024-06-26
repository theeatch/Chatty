"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { Card } from "@/components/ui/card";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useConversation } from "@/hooks/useConvesation";
const MobileNav = () => {
  const paths = useNavigation();

  const {isActive} = useConversation();

  if (isActive) return null;
  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center ">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size="icon"
                        variant={path.active ? "default" : "outline"}
                      >
                        {path.icon}
                      </Button>
                      <TooltipContent>
                        <p>{path.name}</p>
                      </TooltipContent>
                    </TooltipTrigger>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
