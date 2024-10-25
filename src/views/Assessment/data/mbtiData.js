const mbtiData = {
    ENFJ: {
        title: "ENFJ",
        summary: "띠용핑",
        description: "모두를 도와주고, 언제나 친구들에게 웃음을 선사해요. 새로운 아이디어와 계획을 잘 세우고, 친구들을 잘 이끌어줘요.",
        imageUrl: "/img/ENFJ.png",
        tag: "말빨, 유머, 조화, 수용, 상상"
    },
    
    ENTJ: {
        title: "ENTJ",
        summary: "아자핑",
        description: "목표를 세우면 끝까지 달려가요! 항상 리더가 되고 싶어하고, 큰 일을 멋지게 해내는 친구에요.",
        imageUrl: "/img/ENTJ.png",
        tag: "비전, 리더십, 야망, 욕심, 책임감"
    },
    
    ENFP: {
        title: "ENFP",
        summary: "방글핑",
        description: "밝고 에너지가 넘치며, 새로운 친구도 쉽게 사귀는 친구에요. 사람들을 기분 좋게 만드는 힘이 있어요.",
        imageUrl: "/img/ENFP.png",
        tag: "카리스마, 열정, 관계, 비전, 민감"
    },
    
    ENTP: {
        title: "ENTP",
        summary: "똑똑핑",
        description: "재치가 넘치고, 문제를 해결하는 걸 좋아해요. 늘 새로운 도전을 즐기며, 재미있는 이야기를 잘해요.",
        imageUrl: "/img/ENTP.png",
        tag: "상상력, 변화, 도전, 추진, 똑똑"
    },
    
    ESFP: {
        title: "ESFP",
        summary: "차차핑",
        description: "즐거운 분위기를 만드는 데 천재적이에요. 늘 긍정적이고 친구들에게 친근하게 다가가는 친구에요.",
        imageUrl: "/img/ESFP.png",
        tag: "분위기, 긍정, 관대, 털털, 공감"
    },
    
    ESFJ: {
        title: "ESFJ",
        summary: "딱풀핑",
        description: "항상 친구들의 생각을 잘 들어주고, 주변을 따뜻하게 만들어줘요. 공감력이 뛰어난 인싸 친구에요.",
        imageUrl: "/img/ESFJ.png",
        tag: "인싸, 추억, 조화, 공감, 걱정"
    },
    
    ESTJ: {
        title: "ESTJ",
        summary: "바로핑",
        description: "규칙을 중요하게 생각하고, 책임감이 강해요. 늘 맡은 일을 잘 해내는 믿음직한 친구에요.",
        imageUrl: "/img/ESTJ.png",
        tag: "현실, 실용, 규칙, 부지런, 일리"
    },
    
    ESTP: {
        title: "ESTP",
        summary: "키키핑",
        description: "활발하고 다재다능하며, 문제를 재빠르게 해결해요. 언제나 주변을 즐겁게 만드는 친구에요.",
        imageUrl: "/img/ESTP.png",
        tag: "활동, 다양, 농담, 센스, 합리화"
    },
    
    INTP: {
        title: "INTP",
        summary: "나르핑",
        description: "호기심이 많고 깊이 생각해요. 항상 궁금한 것이 많아서 새로운 지식을 찾아 다니는 친구에요.",
        imageUrl: "/img/INTP.png",
        tag: "호불호, 전략, 비평, 솔직, 생각"
    },
    
    INTJ: {
        title: "INTJ",
        summary: "시러핑",
        description: "혼자 계획을 세우고 목표를 이루기 위해 노력해요. 늘 새로운 아이디어로 세상을 변화시키려고 해요.",
        imageUrl: "/img/INTJ.png",
        tag: "비전, 사고, 논쟁, 경쟁, 인정"
    },
    
    INFJ: {
        title: "INFJ",
        summary: "라라핑",
        description: "감정이 깊고, 친구들의 마음을 잘 알아줘요. 어려운 상황에서도 조용히 도와주는 마음 따뜻한 친구에요.",
        imageUrl: "/img/INFJ.png",
        tag: "통찰, 상상, 이상, 사고, 비유"
    },
    
    INFP: {
        title: "INFP",
        summary: "하츄핑",
        description: "상상력이 풍부하고, 항상 꿈을 꾸는 듯한 친구에요. 사랑과 감정에 예민하고, 예술적 감각이 뛰어나요.",
        imageUrl: "/img/INFP.png",
        tag: "이상, 상상, 사랑, 철벽, 감정"
    },
    
    ISFJ: {
        title: "ISFJ",
        summary: "차캐핑",
        description: "배려심이 많고, 친구들을 챙겨줘요. 책임감이 강하고 성실해서 언제나 믿음직스러운 친구에요.",
        imageUrl: "/img/ISFJ.png",
        tag: "온화, 성실, 협조, 매너, 배려"
    },
    
    ISFP: {
        title: "ISFP",
        summary: "차나핑",
        description: "귀엽고 조용하지만, 좋아하는 일에는 열정을 다하는 친구에요. 언제나 차분하고 여유로워요.",
        imageUrl: "/img/ISFP.png",
        tag: "귀차니즘, 집순이, 취존, 즉흥"
    },
    
    ISTJ: {
        title: "ISTJ",
        summary: "믿어핑",
        description: "끈기 있고 차분하게 목표를 이루려 노력해요. 무엇이든 해낼 수 있는 믿음직한 친구에요.",
        imageUrl: "/img/ISTJ.png",
        tag: "끈기, 도전, 성취, 인정, 안정"
    },
    
    ISTP: {
        title: "ISTP",
        summary: "악동핑",
        description: "논리적이고 분석적이며, 문제 해결에 능해요. 혼자 있는 걸 좋아하면서도, 필요할 땐 멋지게 해결해줘요.",
        imageUrl: "/img/ISTP.png",
        tag: "적용, 논리, 판단, 분석, 경험"
    }
    
    
};

export default mbtiData;