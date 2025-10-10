import { useQuery } from '@tanstack/react-query';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '@/api/user/get-user-profile';
import { useAuth } from '@/contexts/auth-context';
import { ProfileDialog } from './profile-dialog';
import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export function AccountMenu() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryFn: getProfile,
    queryKey: ['profile'],
    enabled: isAuthenticated,
  });

  async function handleSignOut() {
    await logout();
    navigate('/sign-in', { replace: true });
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="flex items-center gap-2 select-none border border-primary/50 bg-primary/5"
          >
            {isLoadingProfile ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              profile?.name
            )}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              <span>Profile</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
          >
            <button type="button" className="w-full" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProfileDialog />
    </Dialog>
  );
}
