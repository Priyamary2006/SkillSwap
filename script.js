document.addEventListener("DOMContentLoaded", () => {
  const skillList = document.getElementById("skillList")
  const searchForm = document.getElementById("searchForm")
  const searchInput = document.getElementById("searchInput")
  const addSkillButton = document.getElementById("addSkillButton")
  const addSkillModal = document.getElementById("addSkillModal")
  const addSkillForm = document.getElementById("addSkillForm")
  const profileButton = document.getElementById("profileButton")
  const profileModal = document.getElementById("profileModal")
  const profileForm = document.getElementById("profileForm")
  const chatModal = document.getElementById("chatModal")
  const chatMessages = document.getElementById("chatMessages")
  const chatForm = document.getElementById("chatForm")
  const chatInput = document.getElementById("chatInput")
  const chatPartner = document.getElementById("chatPartner")
  const ratingModal = document.getElementById("ratingModal")
  const ratingForm = document.getElementById("ratingForm")
  const ratingScore = document.getElementById("ratingScore")

  const skills = [
    {
      id: 1,
      title: "Web Development",
      description: "HTML, CSS, JavaScript, React",
      category: "Technology",
      user: "John Doe",
      ratings: [
        { score: 5, comment: "Great teacher!" },
        { score: 4, comment: "Very helpful" },
      ],
    },
    {
      id: 2,
      title: "Graphic Design",
      description: "Adobe Photoshop, Illustrator, InDesign",
      category: "Design",
      user: "Jane Smith",
      ratings: [
        { score: 5, comment: "Amazing skills!" },
        { score: 4, comment: "Very creative" },
      ],
    },
    {
      id: 3,
      title: "Language Teaching",
      description: "Spanish, French, German",
      category: "Education",
      user: "Mike Johnson",
      ratings: [
        { score: 4, comment: "Good teaching methods" },
        { score: 5, comment: "Helped me improve a lot" },
      ],
    },
    {
      id: 3,
      title: "Dancing",
      description: "Kathakali, Mohinyattam",
      category: "Arts",
      user: "Smrithi Rani",
      ratings: [
        { score: 4, comment: "Good teaching methods" },
        { score: 5, comment: "Friendly" },
      ],
    },
    {
      id: 3,
      title: "Public Speaking",
      description: "Leadership, Anchoring",
      category: "Others",
      user: "Jerry Samuel ",
      ratings: [
        { score: 4, comment: "Made me more confident" },
        { score: 5, comment: "Helped me improve a lot" },
      ],
    },
  ]

  let currentUser = {
    name: "",
    email: "",
    bio: "",
  }

  let currentChat = null
  let currentRatingSkill = null

  function renderSkills(skillsToRender) {
    skillList.innerHTML = ""
    skillsToRender.forEach((skill) => {
      const avgRating = calculateAverageRating(skill.ratings)
      const skillCard = document.createElement("div")
      skillCard.classList.add("skill-card")
      skillCard.innerHTML = `
                <h2>${skill.title}</h2>
                <span class="skill-category">${skill.category}</span>
                <p class="skill-description">${skill.description}</p>
                <p class="skill-user">Offered by: ${skill.user}</p>
                <div class="skill-rating">
                    <span class="stars">${getStarRating(avgRating)}</span>
                    <span class="rating-value">${avgRating.toFixed(1)}</span>
                    <span class="rating-count">(${skill.ratings.length} ratings)</span>
                </div>
                <button class="button request-swap" data-skill-id="${skill.id}">Request Swap</button>
                <button class="rate-skill-btn" data-skill-id="${skill.id}">Rate Skill</button>
            `
      skillList.appendChild(skillCard)
    })
    document.querySelectorAll(".request-swap").forEach((button) => {
      button.addEventListener("click", (e) => {
        const skillId = e.target.getAttribute("data-skill-id")
        const skill = skills.find((s) => s.id === Number.parseInt(skillId))
        openChat(skill)
      })
    })
    document.querySelectorAll(".rate-skill-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const skillId = e.target.getAttribute("data-skill-id")
        const skill = skills.find((s) => s.id === Number.parseInt(skillId))
        openRatingModal(skill)
      })
    })
  }

  function calculateAverageRating(ratings) {
    if (ratings.length === 0) return 0
    const sum = ratings.reduce((total, rating) => total + rating.score, 0)
    return sum / ratings.length
  }

  function getStarRating(rating) {
    return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating))
  }

  function filterSkills(searchTerm) {
    return skills.filter(
      (skill) =>
        skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  function openChat(skill) {
    currentChat = skill
    chatPartner.textContent = skill.user
    chatMessages.innerHTML = ""
    chatModal.style.display = "block"
  }

  function openRatingModal(skill) {
    currentRatingSkill = skill
    ratingModal.style.display = "block"
    resetRatingForm()
  }

  function resetRatingForm() {
    ratingScore.value = ""
    document.getElementById("ratingComment").value = ""
    document.querySelectorAll(".star-rating .star").forEach((star) => {
      star.classList.remove("active")
    })
  }

  function addMessage(content, isSent) {
    const messageElement = document.createElement("div")
    messageElement.classList.add("chat-message")
    messageElement.classList.add(isSent ? "sent" : "received")
    messageElement.textContent = content
    chatMessages.appendChild(messageElement)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  function simulateResponse() {
    setTimeout(
      () => {
        const responses = [
          "That sounds interesting! Can you tell me more about your experience?",
          "I'd be happy to swap skills with you. When are you available?",
          "Thanks for reaching out! What specific areas are you looking to improve?",
          "Great! I'm excited to share my knowledge. Do you have any specific questions?",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        addMessage(randomResponse, false)
      },
      1000 + Math.random() * 2000,
    )
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const filteredSkills = filterSkills(searchInput.value)
    renderSkills(filteredSkills)
  })

  addSkillButton.addEventListener("click", () => {
    addSkillModal.style.display = "block"
  })

  addSkillForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newSkill = {
      id: skills.length + 1,
      title: document.getElementById("skillTitle").value,
      description: document.getElementById("skillDescription").value,
      category: document.getElementById("skillCategory").value,
      user: currentUser.name || "Anonymous",
      ratings: [],
    }
    skills.push(newSkill)
    renderSkills(skills)
    addSkillModal.style.display = "none"
    addSkillForm.reset()
  })

  profileButton.addEventListener("click", () => {
    profileModal.style.display = "block"
    document.getElementById("profileName").value = currentUser.name
    document.getElementById("profileEmail").value = currentUser.email
    document.getElementById("profileBio").value = currentUser.bio
  })

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault()
    currentUser = {
      name: document.getElementById("profileName").value,
      email: document.getElementById("profileEmail").value,
      bio: document.getElementById("profileBio").value,
    }
    profileModal.style.display = "none"
    alert("Profile updated successfully!")
  })

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const messageContent = chatInput.value.trim()
    if (messageContent) {
      addMessage(messageContent, true)
      chatInput.value = ""
      simulateResponse()
    }
  })

  ratingForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (currentRatingSkill && ratingScore.value) {
      const newRating = {
        score: Number.parseInt(ratingScore.value),
        comment: document.getElementById("ratingComment").value,
      }
      currentRatingSkill.ratings.push(newRating)
      renderSkills(skills)
      ratingModal.style.display = "none"
      alert("Rating submitted successfully!")
    } else {
      alert("Please select a rating before submitting.")
    }
  })

  document.querySelectorAll(".star-rating .star").forEach((star) => {
    star.addEventListener("click", (e) => {
      const rating = e.target.getAttribute("data-rating")
      ratingScore.value = rating
      document.querySelectorAll(".star-rating .star").forEach((s) => {
        s.classList.toggle("active", s.getAttribute("data-rating") <= rating)
      })
    })
  })

  window.addEventListener("click", (e) => {
    if (e.target === addSkillModal) {
      addSkillModal.style.display = "none"
    }
    if (e.target === profileModal) {
      profileModal.style.display = "none"
    }
    if (e.target === chatModal) {
      chatModal.style.display = "none"
    }
    if (e.target === ratingModal) {
      ratingModal.style.display = "none"
    }
  })

  renderSkills(skills)
})

