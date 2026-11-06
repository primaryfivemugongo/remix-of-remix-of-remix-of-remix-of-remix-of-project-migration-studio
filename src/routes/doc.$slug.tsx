import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { loadDocument } from '@/lib/document-catalog';
import { resourceTitle } from '@/lib/resources';
import { DocumentDetail } from '@/components/document-detail';
import { browsingContext } from '@/lib/document-browsing';
import { useRouteStylesheets } from '@/lib/route-stylesheets';

const docStylesheets = ['bootstrap.min.css', 'font-awesome.css', 'flipbook.style.css'].map(file => `/resource-source/css/${file}`);

export const Route = createFileRoute('/doc/$slug')({
  validateSearch: browsingContext,
  loaderDeps: ({ search }) => ({ source: search.source }),
  loader: async ({ params, deps }) => {
    const data = await loadDocument(params.slug, deps.source);
    if (!data) throw notFound();
    if (data.slug !== params.slug) throw redirect({ to: '/doc/$slug', params: { slug: data.slug }, statusCode: 301 });
    return data;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${resourceTitle(loaderData.item)} | Fresh Teacher` : 'Document unavailable | Fresh Teacher';
    const description = loaderData ? `View and download ${resourceTitle(loaderData.item)}. ${loaderData.item.description} educational resource from Fresh Teacher.` : 'This document is unavailable.';
    return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'article' }, { name: 'twitter:card', content: 'summary_large_image' }, ...(!loaderData ? [{ name: 'robots', content: 'noindex' }] : [])], links: docStylesheets.map(href => ({ rel: 'stylesheet', href })), scripts: loaderData ? [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LearningResource', name: resourceTitle(loaderData.item), description, learningResourceType: 'Educational document', isAccessibleForFree: true, associatedMedia: { '@type': 'MediaObject', contentUrl: loaderData.item.pdfUrl } }) }] : [] };
  },
  component: DocumentRoute,
});
function DocumentRoute() { const data = Route.useLoaderData(); const context = Route.useSearch(); const ready = useRouteStylesheets(docStylesheets); return <div style={ready ? undefined : { visibility: 'hidden' }}><DocumentDetail key={`${data.slug}-${data.path}`} data={data} context={context} /></div>; }