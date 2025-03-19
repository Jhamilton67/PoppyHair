import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbSegment {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  currentPageName?: string;
  customSegments?: BreadcrumbSegment[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPageName, customSegments }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Generate breadcrumb segments from the URL path
  const generateSegments = (): BreadcrumbSegment[] => {
    if (customSegments) return customSegments;
    
    const segments: BreadcrumbSegment[] = [];
    let currentPath = '';
    
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      currentPath += `/${segment}`;
      
      // Skip service ID in the path (e.g., /services/haircuts)
      if (i === 1 && pathSegments[0] === 'services') continue;
      
      // Handle the current page (last segment)
      if (i === pathSegments.length - 1 && currentPageName) {
        segments.push({
          name: currentPageName,
          path: currentPath
        });
      } else {
        // Format segment name (capitalize, replace hyphens with spaces)
        const name = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        segments.push({
          name,
          path: currentPath
        });
      }
    }
    
    return segments;
  };
  
  const segments = generateSegments();
  
  // Create schema.org BreadcrumbList structured data
  const generateBreadcrumbSchema = () => {
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://poppy-hair.com"
      }
    ];
    
    segments.forEach((segment, index) => {
      itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segment.name,
        "item": `https://poppy-hair.com${segment.path}`
      });
    });
    
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  };
  
  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') return null;
  
  return (
    <>
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <ol className="flex items-center flex-wrap">
          <li className="flex items-center">
            <Link to="/" className="text-stone-500 hover:text-stone-700 transition-colors duration-200 flex items-center">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            
            return (
              <li key={segment.path} className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2 text-stone-400" aria-hidden="true" />
                {isLast ? (
                  <span className="text-stone-800 font-medium" aria-current="page">
                    {segment.name}
                  </span>
                ) : (
                  <Link
                    to={segment.path}
                    className="text-stone-500 hover:text-stone-700 transition-colors duration-200"
                  >
                    {segment.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      
      {/* Add structured data for breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify(generateBreadcrumbSchema())}
      </script>
    </>
  );
};

export default Breadcrumbs;