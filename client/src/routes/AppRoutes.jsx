import {

  BrowserRouter,
  Routes,
  Route

} from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute"

import MainLayout from "../layouts/MainLayout"

import Dashboard from "../pages/Dashboard"

import Notes from "../pages/Notes"

import Login from "../pages/Login"

import Signup from "../pages/Signup"

import Flashcards from "../pages/Flashcards"

import Quiz from "../pages/Quiz"

import Planner from "../pages/Planner"

import AIChats from "../pages/AIChats"

import Profile from "../pages/Profile"

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH ROUTES */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* PROTECTED ROUTES */}

        <Route
          path="/"
          element={

            <ProtectedRoute>

              <MainLayout>

                <Dashboard />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/notes"
          element={

            <ProtectedRoute>

              <MainLayout>

                <Notes />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/flashcards"
          element={

            <ProtectedRoute>

              <MainLayout>

                <Flashcards />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/quiz"
          element={

            <ProtectedRoute>

              <MainLayout>

                <Quiz />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/planner"
          element={

            <ProtectedRoute>

              <MainLayout>

                <Planner />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/aichats"
          element={

            <ProtectedRoute>

              <MainLayout>

                <AIChats />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/profile"
          element={

            <ProtectedRoute>

              <MainLayout>

                <Profile />

              </MainLayout>

            </ProtectedRoute>

          }
        />

      </Routes>

    </BrowserRouter>

  )

}