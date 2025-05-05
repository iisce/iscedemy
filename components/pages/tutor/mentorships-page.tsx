'use client';

import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";

export default function MentorshipsPage({
  tutor,
  mentorships,
  mentorshipId
}: {
  tutor: any;
  mentorshipId: string;
  mentorships: any[];
}) {
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredMentorships = mentorships.filter((session) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "upcoming") return !session.completed && new Date(session.scheduledAt) > new Date();
    if (filterStatus === "completed") return session.completed;
    if (filterStatus === "pending") return !session.completed && new Date(session.scheduledAt) <= new Date();
    return true;
  });

  return (
    
        <MaxWidthWrapper className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Mentorship Sessions</h1>
            <div className="flex items-center gap-3">
              <Select onValueChange={setFilterStatus} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link href={`/tutor/mentorship/${mentorshipId}`}>Schedule New Session</Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Mentorship Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredMentorships.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMentorships.map((session) => {
                      const isUpcoming = !session.completed && new Date(session.scheduledAt) > new Date();
                      const isPending = !session.completed && new Date(session.scheduledAt) <= new Date();
                      const status = session.completed ? "Completed" : isUpcoming ? "Upcoming" : "Pending";

                      return (
                        <TableRow key={session.id}>
                          <TableCell>{session.mentee?.name || "Unknown"}</TableCell>
                          <TableCell>{new Date(session.scheduledAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={status === "Completed" ? "greenTeal" : status === "Upcoming" ? "secondary" : "destructive"}>
                              {status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="hover:bg-green-600 hover:text-white"
                            >
                              <Link href={`/tutor/mentorship/${session.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-600 text-center">No mentorship sessions found.</p>
              )}
            </CardContent>
          </Card>
        </MaxWidthWrapper>
  );
}