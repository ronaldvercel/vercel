import { redirect } from "next/navigation";
import { auth } from "../auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await auth();
  if (!profile) {
    redirect("/login");
  }
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <div className="">{children}</div>
      </body>
    </html>
  );
}
