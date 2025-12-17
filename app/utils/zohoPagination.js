/**
 * Shared Zoho API pagination utility
 * Handles pagination for up to 2000+ records using page and page_token
 */

/**
 * Fetch all pages of data from Zoho API with pagination
 * @param {string} baseUrl - The base Zoho API URL (without pagination params)
 * @param {string} accessToken - Zoho OAuth access token
 * @returns {Promise<{data: Array}>} - All fetched records
 */
export async function fetchAllPages(baseUrl, accessToken) {
  let allData = [];
  let page = 1;
  let hasMoreRecords = true;
  let pageToken = null;
  const perPage = 200; // Maximum allowed by Zoho API

  while (hasMoreRecords) {
    let url;
    
    // For first 2000 records (pages 1-10), use 'page' parameter
    // After 2000 records, use 'page_token' parameter
    if (pageToken) {
      url = `${baseUrl}&per_page=${perPage}&page_token=${pageToken}`;
    } else {
      url = `${baseUrl}&per_page=${perPage}&page=${page}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Cookie': '_zcsr_tmp=2c457748-76e7-4104-8147-6df9dccc1b0b; crmcsr=2c457748-76e7-4104-8147-6df9dccc1b0b'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API failed (${response.status}):`, errorText);
      throw new Error(`API failed: ${response.status}`);
    }

    const data = await response.json();

    console.log({
      per_page: data.info?.per_page,
      count: data.info?.count,
      sort_by: data.info?.sort_by,
      page: data.info?.page,
      sort_order: data.info?.sort_order,
      more_records: data.info?.more_records,
      next_page_token: data.info?.next_page_token ? 'present' : 'null',
      using_page_token: pageToken ? true : false
    }, "pagination info");

    // Append current page data to allData
    if (data.data && data.data.length > 0) {
      allData = [...allData, ...data.data];
    }

    // Check if there are more records
    hasMoreRecords = data.info && data.info.more_records === true;
    
    // If we've fetched 2000 records (10 pages) and there are more records,
    // switch to using page_token for subsequent requests
    if (page >= 10 && hasMoreRecords && data.info?.next_page_token) {
      pageToken = data.info.next_page_token;
      console.log('Switching to page_token for records beyond 2000');
    } else if (!pageToken) {
      // Only increment page if we're not using page_token
      page++;
    } else {
      // Update page_token for next iteration
      pageToken = data.info?.next_page_token;
    }
  }

  console.log(`Total records fetched: ${allData.length}`);
  return { data: allData };
}
