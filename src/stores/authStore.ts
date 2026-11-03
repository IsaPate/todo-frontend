import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";
import type { UserRole } from "./types";

// ─────────────────────────────────────────────────────────────
// 1. ΤΥΠΟΙ
// ─────────────────────────────────────────────────────────────

// TODO: ο τύπος του user όπως τον στέλνει το backend (UserResponse.java).
// Δες τα πεδία του record: id, username, userRole.
// (Καλύτερα σε δικό του αρχείο αργότερα, π.χ. src/Auth/type.ts)
type User = {
  id: number;
  username: string;
  password: string;
  userRole: UserRole;
};

// Ο τύπος ΟΛΟΥ του store: τι state κρατάει + ποιες functions (actions) έχει.
// Σκέψου το σαν interface μιας Java κλάσης: πεδία + μέθοδοι.
type AuthState = {
  // --- state ---
  token: string | null; // null = δεν είναι συνδεδεμένος
  user: User | null;

  // --- actions ---
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    password: string,
    userRole: UserRole
  ) => Promise<void>;
};

// ─────────────────────────────────────────────────────────────
// 2. ΤΟ STORE
// ─────────────────────────────────────────────────────────────
//
// create<AuthState>()(...)  → φτιάχνει ένα hook: useAuthStore
//                             (τα διπλά () είναι απαίτηση του Zustand για TypeScript)
//
// persist(..., { name })    → αποθηκεύει αυτόματα το state στο localStorage
//                             με κλειδί "auth", και το ξαναφορτώνει μετά από refresh
//
// (set) => ({ ... })        → η function που ορίζει αρχικό state + actions.
//                             set({ ... }) = αλλάζει το state (σαν το setState της React).
//                             Γράφεις ΜΟΝΟ τα πεδία που αλλάζουν, τα υπόλοιπα μένουν ως έχουν.

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // ── αρχικές τιμές ──
      token: null,
      user: null,

      // ── login ──
      login: async (username, password) => {
        // TODO 1: POST στο "/auth/login" με body { username, password }
        //         (θυμήσου: το api έχει ήδη baseURL ".../api")
        const { data } = await api.post("/auth/login", {
          username,
          password,
        });
        const { token, user } = data;
        //
        // TODO 2: από το response πάρε token και user
        //         (το backend επιστρέφει LoginResponse { token, user })
        //
        set({ token, user });
        // TODO 3: set({ ... }) για να τα αποθηκεύσεις στο store
        //
        // Σημείωση: ΜΗΝ πιάσεις το error εδώ με try/catch.
        // Άφησέ το να «ανέβει» στη σελίδα Login, για να δείξει εκεί μήνυμα λάθους.
      },

      // ── logout ──
      logout: () => {
        // TODO 4: καθάρισε token και user (τι τιμή σημαίνει «δεν υπάρχει»;)
        set({ token: null, user: null });
      },

      register: async (
        username: string,
        password: string,
        userRole: UserRole
      ) => {
        const { data } = await api.post("/auth/register", {
          username,
          password,
          userRole,
        });
        const { user } = data;
        set({ token: null, user });
      },
    }),
    { name: "auth" } // κλειδί στο localStorage → δες DevTools → Application → Local Storage
  )
);

// ─────────────────────────────────────────────────────────────
// 3. ΠΩΣ ΤΟ ΧΡΗΣΙΜΟΠΟΙΕΙΣ (για αργότερα, δεν χρειάζεται να γράψεις κάτι εδώ)
// ─────────────────────────────────────────────────────────────
//
// Μέσα σε component (hook → κάνει re-render όταν αλλάξει η τιμή):
//   const token = useAuthStore((s) => s.token);
//   const login = useAuthStore((s) => s.login);
//   await login("isaak", "12345678");
//
// Έξω από component, π.χ. στο axios interceptor (ΟΧΙ hook, απλή ανάγνωση):
//   useAuthStore.getState().token
//
// Γιατί (s) => s.token και όχι ολόκληρο το store;
//   Το component ξανακάνει render μόνο όταν αλλάξει ΑΥΤΟ που διάλεξες.
