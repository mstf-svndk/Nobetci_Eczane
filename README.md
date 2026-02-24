# Türkiye Nöbetçi Eczaneler (Vercel)

## Kurulum (Vercel)
1) Bu repo'yu GitHub'a koy.
2) Vercel'de "New Project" → repo'yu seç.
3) Project Settings → Environment Variables:
   - `COLLECTAPI_KEY` = CollectAPI "authorization" anahtarın (örn: apikey ...)

Deploy sonrası site: `/`  
API: `/api/dutyPharmacy?il=Istanbul`

## Notlar
- API key artık tarayıcıya gitmiyor; Vercel Function içinde kalıyor.
- İstersen Cache-Control'u değiştirip (s-maxage) kısa süreli cache ekleyebilirsin.
