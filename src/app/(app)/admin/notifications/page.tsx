
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockNotifications } from "@/lib/data"
import { Notification } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Check, Mail } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications)

  const unreadNotifications = notifications.filter(n => !n.isRead)
  const readNotifications = notifications.filter(n => n.isRead)

  const handleMarkAsRead = (id: string) => {
    setNotifications(current =>
      current.map(n => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(current => current.map(n => ({ ...n, isRead: true })))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Notifications</h1>
        <Button variant="outline" onClick={handleMarkAllAsRead} disabled={unreadNotifications.length === 0} className="gap-2">
            <Check /> Mark all as read
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
           <Tabs defaultValue="unread">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
            <TabsContent value="unread">
              <NotificationList
                notifications={unreadNotifications}
                onMarkAsRead={handleMarkAsRead}
              />
            </TabsContent>
            <TabsContent value="read">
              <NotificationList notifications={readNotifications} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationList({
  notifications,
  onMarkAsRead,
}: {
  notifications: Notification[]
  onMarkAsRead?: (id: string) => void
}) {
  if (notifications.length === 0) {
    return <div className="p-6 text-center text-muted-foreground">No new notifications.</div>
  }

  return (
    <div className="flow-root">
      <ul className="divide-y divide-border">
        {notifications.map(notification => (
          <li
            key={notification.id}
            className={cn(
              "p-4 hover:bg-muted/50",
              !notification.isRead && "bg-blue-50 dark:bg-blue-950/50"
            )}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 pt-1">
                 <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
                 <p className="text-xs text-muted-foreground mt-1">
                  {notification.timestamp}
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <Button variant="outline" size="sm" asChild>
                    <Link href={notification.link}>View</Link>
                </Button>
                {onMarkAsRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
