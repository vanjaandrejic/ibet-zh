import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/home-page";
import TopNavigation from "./components/navigation/top-navigation";
import BotNavigation from "./components/navigation/bot-navigation";
// import TicektPage from "./pages/ticket-page";
import ResultPage from "./pages/results-page";
// import Statusticket from "./pages/status-ticket-page";
import LastMinutePage from "./pages/last-minute-page";
import OddsPage from "./pages/odds-page";
import AccountPage from "./pages/account-page";
import DynamicPage from "./pages/dynamic-matches-page";
import PrematchPage from "./pages/prematch-page";
import LiveMatchesPage from "./pages/live-matches-page";
import SearchPage from "./pages/search-page";
// import UserDetailsPage from "./pages/user-details-page";
import ChangePasswordPage from "./pages/change-password-page";
import UserTransactionsPage from "./pages/user-transactions-page";
import LivePrematchPage from "./pages/live-prematch-page";
import CasionPage from "./pages/casino-page";
// import FullMatchOddsPage from "./pages/full-match-odds";
import CasinoGamePage from "./pages/casino-game-page";
import RegistrationPage from "./pages/registration-page";
import TicketsEvidencePage from "./pages/tickets-evidence-page";
import TicketFullPage from "./pages/ticket-full-page";
import CreditCardPayPage from "./pages/uplata-platnom-karticom";
import PayoutBankAccount from "./pages/payout-bank-account";
import PayoutLocation from "./pages/payout-location";
import UserIdentityVerificationPage from "./pages/user-identity-verification";
import HomePageDesktop from "./pages/home-page-desktop";
import { useMediaQuery } from "@mui/material";
import CasinoSearchPage from "./pages/casino-search-page";
import RootPage from "./pages/root-page";
import RootPageDesktop from "./pages/root-page-desktop";
import AccountPageDesktop from "./pages/account-pate-desktop";
import ResetPasswordEmailPage from "./pages/reset-password-email-page";
import RegistrationPageDesktop from "./pages/registration-page-desktop";
import TicketsEvidencePageDesktop from "./pages/tickets-evidence-page-desktop";
import WebSocketComponent from "./socket/socket";
// import PomocPage from "./pages/pomoc-page";

export default function App() {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  return (
    <BrowserRouter>
      <WebSocketComponent />
      <Layout>
        <TopNavigation />

        <Routes>
          <Route
            path="/"
            element={isDesktop ? <RootPageDesktop /> : <RootPage />}
          />
          <Route
            path="/sport"
            element={isDesktop ? <HomePageDesktop /> : <HomePage />}
          />
          {/* <Route path="/ticket" element={<TicektPage />} /> */}
          <Route path="/result" element={<ResultPage />} />
          {/* <Route path="/status" element={<Statusticket />} /> */}
          <Route path="/lastminute" element={<LastMinutePage />} />
          <Route path="/oddrange" element={<OddsPage />} />
          <Route
            path="/account"
            element={isDesktop ? <AccountPageDesktop /> : <AccountPage />}
          />
          <Route path="/live" element={<LiveMatchesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/slot" element={<CasionPage />} />
          <Route path="/slot-search" element={<CasinoSearchPage />} />
          <Route path="/slot-game" element={<CasinoGamePage />} />
          {/* <Route path="/help" element={<PomocPage />} /> */}
          <Route
            path="/registration"
            element={
              isDesktop ? <RegistrationPageDesktop /> : <RegistrationPage />
            }
          />

          {/* <Route path="/user-details" element={<UserDetailsPage />} /> */}
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/payment-card" element={<CreditCardPayPage />} />
          <Route path="/payout-bank-account" element={<PayoutBankAccount />} />
          <Route path="/payout-location" element={<PayoutLocation />} />
          <Route
            path="/user-identitiy-verification"
            element={<UserIdentityVerificationPage />}
          />

          <Route path="/user-transactions" element={<UserTransactionsPage />} />
          <Route
            path="/user-played-tickets"
            element={
              isDesktop ? (
                <TicketsEvidencePageDesktop />
              ) : (
                <TicketsEvidencePage />
              )
            }
          />
          <Route path="/reset-password" element={<ResetPasswordEmailPage />} />

          <Route
            path="/league-offer/:sportId/:leagueId"
            element={<DynamicPage />}
          />
          <Route
            path="/prematch-special/:sportId/:matchId"
            element={<PrematchPage />}
          />
          <Route
            path="/user-played-ticket/:ticketCode"
            element={<TicketFullPage />}
          />
          <Route path="/live-offer/:s/:mc" element={<LivePrematchPage />} />
        </Routes>
        <BotNavigation />
      </Layout>
    </BrowserRouter>
  );
}
