import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function AdminDashboard() {
     return (
          <div className="p-5">
               <div className="p-5 font-bold">Admin Dashboad</div>
               <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                         <CardHeader>
                              <CardTitle>Courses Revenue</CardTitle>
                         </CardHeader>
                         <CardContent className="grid gap-4">
                              <div className="flex justify-between">
                                   <span>Total Amount Per Course:</span>
                                   <span className="font-semibold">
                                        $12,345
                                   </span>
                              </div>
                              <div className="flex justify-between">
                                   <span>Net Total Amount:</span>
                                   <span className="font-semibold">
                                        $54,321
                                   </span>
                              </div>
                         </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                              <CardTitle>Courses</CardTitle>
                         </CardHeader>
                         <CardContent className="grid gap-4">
                              <div className="flex justify-between">
                                   <span>Total Number of Courses:</span>
                                   <span className="font-semibold">25</span>
                              </div>
                              <div className="flex justify-between">
                                   <span>Total Registration Per Course:</span>
                                   <span className="font-semibold">1,234</span>
                              </div>
                              <div className="flex justify-between">
                                   <span>Net Total Registration:</span>
                                   <span className="font-semibold">30,850</span>
                              </div>
                         </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                         <CardHeader>
                              <CardTitle>Tutors</CardTitle>
                         </CardHeader>
                         <CardContent className="grid gap-4">
                              <div className="flex justify-between">
                                   <span>Number of Tutors:</span>
                                   <span className="font-semibold">50</span>
                              </div>
                              <div className="flex justify-between">
                                   <span>Number of Tutor Courses:</span>
                                   <span className="font-semibold">75</span>
                              </div>
                              <div className="flex justify-between">
                                   <span>Number of Students Per Tutor:</span>
                                   <span className="font-semibold">20</span>
                              </div>
                         </CardContent>
                    </Card>
               </div>
          </div>
     );
}
