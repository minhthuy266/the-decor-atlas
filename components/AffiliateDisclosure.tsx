import Link from 'next/link';
import { Info } from 'lucide-react';

interface AffiliateDisclosureProps {
  variant?: 'post' | 'shop';
}

export default function AffiliateDisclosure({ variant = 'post' }: AffiliateDisclosureProps) {
  return (
    <div className={`flex items-start gap-3 text-xs leading-relaxed text-stone-500 border border-stone-200 bg-stone-50 px-4 py-3 rounded-sm ${variant === 'shop' ? 'mb-8' : 'mb-10'}`}>
      <Info size={14} className="text-stone-400 shrink-0 mt-0.5" />
      <p>
        <strong className="text-stone-700 font-bold">Affiliate Disclosure:</strong>{' '}
        This {variant === 'shop' ? 'page' : 'post'} contains affiliate links. If you click a link and make a purchase,
        we may earn a small commission at no extra cost to you. We only recommend products we genuinely love.{' '}
        <Link href="/privacy#affiliate" className="underline decoration-stone-300 underline-offset-2 hover:text-stone-900 transition-colors">
          Learn more
        </Link>
        .
      </p>
    </div>
  );
}
