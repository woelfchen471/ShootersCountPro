/**
 * Hit-basiertes Datenmodell – v2-ready.
 *
 * Jeder Schuss wird als `Hit` erfasst. Im MVP enthält ein Hit nur den
 * Ringwert. In v2 kommen XY-Koordinaten, Bilddaten und Konfidenzwerte
 * hinzu, ohne das bestehende Modell zu brechen.
 */

export interface Hit {
  /** Ringwert 0-10 */
  ring: number
  /** Ist es ein "X" (Innenzehner)? */
  isX: boolean
  /** Zeitstempel des Treffers */
  timestamp: number

  // ── v2-Felder (optional, für spätere Erweiterung) ──
  /** X-Koordinate auf der Scheibe (Pixel oder mm) */
  x?: number
  /** Y-Koordinate auf der Scheibe (Pixel oder mm) */
  y?: number
  /** Referenz auf ein Bild (base64 oder URL) */
  imageRef?: string
  /** Konfidenz der automatischen Erkennung (0-1) */
  confidence?: number
}

export interface ShotSet {
  id: string
  hits: Hit[]
  totalRings: number
  totalShots: number
  average: number
  createdAt: number
}

export interface Session {
  currentHits: Hit[]
  savedSets: ShotSet[]
}

/** Ring-Labels von 10 bis 0 plus X */
export const RING_VALUES = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0] as const
export type RingValue = (typeof RING_VALUES)[number]
