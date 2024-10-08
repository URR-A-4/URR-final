export const userSignUp = async ({
  email,
  password,
  nickname,
  confirm = null,
  selectUser,
  approve
}: {
  email: string;
  password: string;
  nickname: string;
  confirm?: string | null;
  selectUser: string;
  approve: boolean;
}) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, nickname, confirm, selectUser, approve })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server response error:", errorData);
      throw new Error(errorData);
      // return errorData;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const userLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error("로그인 요청 실패: " + response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const userLogout = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "DELETE"
    });
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

export const infUserApprove = async () => {
  try {
    const response = await fetch("/api/auth/users/infuser");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserApprove = async (userId: string) => {
  try {
    const response = await fetch("/api/auth/users/infuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId })
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const nicknameCheck = async (nickname: string) => {
  const response = await fetch(`/api/auth/signup/nicknamecheck?nickname=${nickname}`);
  const data = await response.json();
  return data;
};

export const emailCheck = async (email: string) => {
  const response = await fetch(`/api/auth/signup/emailcheck?email=${email}`);
  const data = await response.json();
  return data;
};
