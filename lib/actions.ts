export async function getUser(token: string | undefined) {
  const response = await fetch('http://localhost:3000/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  return data;
}

export async function getCollaborator(token?: string) {
  const { user_id } = await getUser(token);

  const response = await fetch(
    `http://localhost:3000/collaborator/find/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  return data;
}
