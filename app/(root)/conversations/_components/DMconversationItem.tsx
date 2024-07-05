import { Id } from '@/convex/_generated/dataModel'
import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

type Props = {
    id: Id<"conversations">;
    imageUrl: string;
    username: string;
}

const DMconversationItem = ({id, imageUrl, username}: Props) => {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
        <Card className='p-2 flex flex-row items-center gap-4 truncate'>
            <div className="flex flex-row items-center gap-4 truncate">
                <Avatar>
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
                <div className='flex flex-col truncate'>
                    <h4 className='truncate font-semibold'>{username}</h4>
                    <p className='text-sm text-muted-foreground truncate'>
                        
                    </p>
                </div>
            </div>
        </Card>
    </Link>
  )
}

export default DMconversationItem