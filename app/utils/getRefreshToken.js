// Global cache that persists across API requests in Next.js
if (!global.tokenCache) {
    global.tokenCache = {
        accessToken: null,
        expirationTime: null
    };
}

export const getRefreshToken = async () => {
    const currentTime = Date.now();
    
    // Check if we have a valid cached token
    const hasValidToken = global.tokenCache.accessToken && global.tokenCache.expirationTime && currentTime < global.tokenCache.expirationTime;
    
    if (global.tokenCache.accessToken) {
        const timeRemaining = global.tokenCache.expirationTime - currentTime;
        //console.log(`Token cache: ${hasValidToken ? 'VALID' : 'EXPIRED'} (${Math.round(timeRemaining / 1000 / 60)}min remaining)`);
    } else {
        //console.log("Token cache: EMPTY");
    }
    
    // If we have a valid cached token that hasn't expired, return it
    if (hasValidToken) {
        //console.log("🔄 Using cached token");
        return global.tokenCache.accessToken;
    }

    // If no valid cached token, fetch a new one
    //console.log("Fetching new access token...");
    const tokenResponse = await fetch('https://accounts.zoho.in/oauth/v2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': '_zcsr_tmp=a6fa39ea-832d-4192-9592-6c788b58a835; iamcsr=a6fa39ea-832d-4192-9592-6c788b58a835; zalb_6e73717622=dea4bb29906843a6fbdf3bd5c0e43d1d'
        },
        body: new URLSearchParams({
          'grant_type': 'refresh_token',
          'client_id': '1000.KBTLU1N3JX4IR4JYSNTVJ3U9JFS5GF',
          'client_secret': 'bb4740b298fa601d2fc240bbc23d265d338896d3c5',
          'refresh_token': '1000.e66c4e8523293a4624de5a97f8291285.c4e96c6e52a5f5729bb1c8e71c0cc539'
        })
      });
  
      if (!tokenResponse.ok) {
        throw new Error(`Token API failed: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      
      // Cache the token and set expiration time (3500 seconds from now)
      // Zoho tokens are valid for exactly 3500 seconds, cache for 3400 seconds to be safe
      const newExpirationTime = Date.now() + (3400 * 1000);
      global.tokenCache.accessToken = accessToken;
      global.tokenCache.expirationTime = newExpirationTime;
      
      //console.log("✅ Token cached successfully for ~2.5 minutes (3400 seconds)");
      
      return accessToken;
}   