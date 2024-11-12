'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

type Badge = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type User = {
  id: number;
  name: string;
  bagdes?: number[];
};

export default function Page() {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 1,
      name: 'Gold Member',
      description: 'Awarded to members with 5 years of continuous membership',
      image: '/placeholder.svg?height=100&width=100'
    },
    {
      id: 2,
      name: 'Event Organizer',
      description: 'For members who have organized 3 or more club events',
      image: '/placeholder.svg?height=100&width=100'
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', bagdes: [1, 2] },
    { id: 2, name: 'Jane Smith', bagdes: [2] },
    { id: 3, name: 'Alice Johnson', bagdes: [1] },
    { id: 4, name: 'Bob Williams', bagdes: [1, 2] },
    { id: 5, name: 'Charlie Brown', bagdes: [2] }
  ]);

  const [newBadge, setNewBadge] = useState<Omit<Badge, 'id' | 'usersCount'>>({
    name: '',
    description: '',
    image: ''
  });
  const [isAddBadgeModalOpen, setIsAddBadgeModalOpen] = useState(false);
  const [isAssignBadgeModalOpen, setIsAssignBadgeModalOpen] = useState(false);
  const [selectedBadgeId, setSelectedBadgeId] = useState<number | null>(null);

  const handleAddBadge = () => {
    const newBadgeWithId: Badge = {
      ...newBadge,
      id: badges.length + 1
    };
    setBadges([...badges, newBadgeWithId]);
    setNewBadge({ name: '', description: '', image: '' });
    setIsAddBadgeModalOpen(false);
  };

  const handleDeleteBadge = (id: number) => {
    setBadges(badges.filter((badge) => badge.id !== id));
  };

  const closeAssignBadge = () => {
    setIsAssignBadgeModalOpen(false);
    setSelectedBadgeId(null);
  };

  return (
    <Card className="container mx-auto mt-5 w-full max-w-4xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Badge Management Dashboard</h1>
        <Dialog
          open={isAddBadgeModalOpen}
          onOpenChange={setIsAddBadgeModalOpen}
        >
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Badge
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Badge</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new badge
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="badge-name">Badge Name</Label>
                <Input
                  id="badge-name"
                  value={newBadge.name}
                  onChange={(e) =>
                    setNewBadge({ ...newBadge, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge-description">Description</Label>
                <Textarea
                  id="badge-description"
                  value={newBadge.description}
                  onChange={(e) =>
                    setNewBadge({ ...newBadge, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge-image">Badge Image</Label>
                <Input
                  id="badge-image"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewBadge({
                          ...newBadge,
                          image: reader.result as string
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              {newBadge.image && (
                <div className="mt-4">
                  <img
                    src={newBadge.image}
                    alt="Badge Preview"
                    className="h-24 w-24 object-contain"
                  />
                </div>
              )}
              <Button onClick={handleAddBadge} className="w-full">
                Add Badge
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Users Count</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {badges.map((badge) => (
            <TableRow key={badge.id}>
              <TableCell>
                <img
                  src={badge.image}
                  alt={badge.name}
                  className="h-10 w-10 object-contain"
                />
              </TableCell>
              <TableCell>{badge.name}</TableCell>
              <TableCell>{badge.description}</TableCell>
              <TableCell>
                {users.filter((user) => user.bagdes?.includes(badge.id)).length}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteBadge(badge.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>

                  <div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedBadgeId(badge.id);
                        setIsAssignBadgeModalOpen(true);
                      }}
                    >
                      <Users className="h-4 w-4" />
                      <span className="sr-only">Assign</span>
                    </Button>
                  </div>
                  <Dialog
                    open={isAssignBadgeModalOpen}
                    onOpenChange={setIsAssignBadgeModalOpen}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign Badge: {badge.name}</DialogTitle>
                        <DialogDescription>
                          Select users to assign this badge
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 space-y-4">
                        {users.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center space-x-2"
                            onClick={() => {
                              if (user.bagdes?.includes(badge.id)) {
                                setUsers([
                                  ...users.map((u) => {
                                    if (u.id === user.id) {
                                      u.bagdes = u.bagdes?.filter(
                                        (b) => b !== badge.id
                                      );
                                    }
                                    return u;
                                  })
                                ]);
                              } else {
                                setUsers([
                                  ...users.map((u) => {
                                    if (u.id === user.id) {
                                      u.bagdes = [
                                        ...(u.bagdes || []),
                                        badge.id
                                      ];
                                    }
                                    return u;
                                  })
                                ]);
                              }
                            }}
                          >
                            <Checkbox
                              id={`user-${user.id}`}
                              checked={user.bagdes?.includes(badge.id)}
                            />
                            <Label htmlFor={`user-${user.id}`}>
                              {user.name}
                            </Label>
                          </div>
                        ))}
                        <Button onClick={closeAssignBadge} className="w-full">
                          Close
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}