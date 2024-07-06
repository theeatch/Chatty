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

const DeleteGroupDialog = ({ conversationId, open, setOpen }: Props) => {
  const { mutate: deleteGroup, pending } = useMutationState(api.conversation.deleteGroup);

  const handleDeleteGroup = async () => {
    deleteGroup({ conversationId })
      .then(() => {
        toast.success("Group Deleted");
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
            This action cannot be undone. All message will be deleted and you will not be able to message in this gruop.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogAction disabled={pending} onClick={handleDeleteGroup}>Delete Group</AlertDialogAction>
            <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGroupDialog;
