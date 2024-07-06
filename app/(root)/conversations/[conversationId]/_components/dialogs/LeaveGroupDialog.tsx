"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutationState } from "@/hooks/useMutationState";
import { ConvexError } from "convex/values";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type Props = {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LeaveGroupDialog = ({ conversationId, open, setOpen }: Props) => {
  const { mutate: leaveGroup, pending } = useMutationState(api.conversation.leaveGroup);

  const handleLeaveGroup = async () => {
    leaveGroup({ conversationId })
      .then(() => {
        toast.success("Group Left");
      })
      .catch((err) =>
        toast.error(err instanceof ConvexError ? err.data : "An error occured")
      );
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will not be able to see any previous messages or send any new messages to this group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogAction disabled={pending} onClick={handleLeaveGroup}>Leave Group</AlertDialogAction>
            <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LeaveGroupDialog;
