import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import DocsSidebar from '@/components/layout/docs-sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DocsSidebar />
      <div className="flex-1 overflow-y-auto">
        <MaxWidthWrapper>
          <main className="px-6 py-10">{children}</main>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}
